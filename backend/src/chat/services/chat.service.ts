import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatSession, SessionStatus } from '../entities/chat-session.entity';
import { ChatMessage, MessageRole, MessageStatus } from '../entities/chat-message.entity';
import { BedrockService } from '../ai/bedrock/bedrock.service';
import { EmbeddingsService } from '../ai/embeddings/embeddings.service';
import { PromptsService } from '../ai/prompts/prompts.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    @InjectRepository(ChatSession)
    private chatSessionRepository: Repository<ChatSession>,
    
    @InjectRepository(ChatMessage)
    private chatMessageRepository: Repository<ChatMessage>,
    
    private bedrockService: BedrockService,
    private embeddingsService: EmbeddingsService,
    private promptsService: PromptsService,
  ) {}

  // Session methods
  async createSession(userId: string, title: string, description?: string): Promise<ChatSession> {
    try {
      const session = this.chatSessionRepository.create({
        userId,
        title: title || 'New Chat',
        description,
        status: SessionStatus.ACTIVE,
      });
      
      return this.chatSessionRepository.save(session);
    } catch (error) {
      this.logger.error(`Error creating chat session: ${error.message}`);
      throw error;
    }
  }

  async findAllSessions(userId: string, status?: SessionStatus): Promise<ChatSession[]> {
    try {
      const query = this.chatSessionRepository
        .createQueryBuilder('session')
        .leftJoinAndSelect('session.messages', 'messages')
        .where('session.userId = :userId', { userId });
      
      if (status) {
        query.andWhere('session.status = :status', { status });
      }
      
      query.orderBy('session.updatedAt', 'DESC');
      
      return query.getMany();
    } catch (error) {
      this.logger.error(`Error finding chat sessions: ${error.message}`);
      throw error;
    }
  }

  async findSessionById(id: string, userId: string): Promise<ChatSession> {
    try {
      const session = await this.chatSessionRepository.findOne({
        where: { id, userId },
        relations: ['messages'],
      });
      
      if (!session) {
        throw new NotFoundException(`Chat session with ID "${id}" not found`);
      }
      
      return session;
    } catch (error) {
      this.logger.error(`Error finding chat session: ${error.message}`);
      throw error;
    }
  }

  async updateSession(id: string, userId: string, updateData: Partial<ChatSession>): Promise<ChatSession> {
    try {
      const session = await this.findSessionById(id, userId);
      
      // Filter out properties that shouldn't be updated directly
      const { messages, user, ...updateFields } = updateData as any;
      
      Object.assign(session, updateFields);
      return this.chatSessionRepository.save(session);
    } catch (error) {
      this.logger.error(`Error updating chat session: ${error.message}`);
      throw error;
    }
  }

  async deleteSession(id: string, userId: string): Promise<void> {
    try {
      const session = await this.findSessionById(id, userId);
      
      // Soft delete - just mark as deleted
      session.status = SessionStatus.DELETED;
      await this.chatSessionRepository.save(session);
    } catch (error) {
      this.logger.error(`Error deleting chat session: ${error.message}`);
      throw error;
    }
  }

  async archiveSession(id: string, userId: string): Promise<ChatSession> {
    try {
      const session = await this.findSessionById(id, userId);
      
      session.status = SessionStatus.ARCHIVED;
      return this.chatSessionRepository.save(session);
    } catch (error) {
      this.logger.error(`Error archiving chat session: ${error.message}`);
      throw error;
    }
  }

  async shareSession(id: string, userId: string): Promise<{ shareCode: string }> {
    try {
      const session = await this.findSessionById(id, userId);
      
      session.isShared = true;
      session.shareCode = session.shareCode || uuidv4();
      
      await this.chatSessionRepository.save(session);
      
      return { shareCode: session.shareCode };
    } catch (error) {
      this.logger.error(`Error sharing chat session: ${error.message}`);
      throw error;
    }
  }

  async unshareSession(id: string, userId: string): Promise<ChatSession> {
    try {
      const session = await this.findSessionById(id, userId);
      
      session.isShared = false;
      
      return this.chatSessionRepository.save(session);
    } catch (error) {
      this.logger.error(`Error unsharing chat session: ${error.message}`);
      throw error;
    }
  }

  async getSessionByShareCode(shareCode: string): Promise<ChatSession> {
    try {
      const session = await this.chatSessionRepository.findOne({
        where: { shareCode, isShared: true },
        relations: ['messages'],
      });
      
      if (!session) {
        throw new NotFoundException('Shared chat session not found');
      }
      
      return session;
    } catch (error) {
      this.logger.error(`Error finding shared chat session: ${error.message}`);
      throw error;
    }
  }

  // Message methods
  async addMessage(
    sessionId: string,
    userId: string,
    content: string,
    role: MessageRole = MessageRole.USER,
  ): Promise<ChatMessage> {
    try {
      const session = await this.findSessionById(sessionId, userId);
      
      const message = this.chatMessageRepository.create({
        sessionId,
        userId,
        content,
        role,
        status: MessageStatus.COMPLETED,
      });
      
      const savedMessage = await this.chatMessageRepository.save(message);
      
      // Update session
      session.messageCount += 1;
      session.lastMessageAt = new Date();
      await this.chatSessionRepository.save(session);
      
      return savedMessage;
    } catch (error) {
      this.logger.error(`Error adding chat message: ${error.message}`);
      throw error;
    }
  }

  async generateResponse(
    sessionId: string,
    userId: string,
    userMessage: string,
  ): Promise<ChatMessage> {
    try {
      // First add the user message
      const userChatMessage = await this.addMessage(
        sessionId,
        userId,
        userMessage,
        MessageRole.USER,
      );
      
      // Create a pending assistant message
      const pendingMessage = this.chatMessageRepository.create({
        sessionId,
        userId,
        content: '',
        role: MessageRole.ASSISTANT,
        status: MessageStatus.PROCESSING,
        parentMessageId: userChatMessage.id,
      });
      
      const savedPendingMessage = await this.chatMessageRepository.save(pendingMessage);
      
      // Get session context
      const session = await this.findSessionById(sessionId, userId);
      
      // Get conversation history
      const messages = await this.chatMessageRepository.find({
        where: { sessionId },
        order: { createdAt: 'ASC' },
      });
      
      const conversationHistory = messages
        .filter(msg => msg.id !== savedPendingMessage.id)
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n\n');
      
      const startTime = Date.now();
      
      // Generate AI response
      const aiResponse = await this.bedrockService.generateResponse(
        userMessage,
        conversationHistory,
      );
      
      const endTime = Date.now();
      const processingTime = endTime - startTime;
      
      // Estimate tokens (very rough estimate)
      const inputTokens = (userMessage.length + conversationHistory.length) / 4;
      const outputTokens = aiResponse.length / 4;
      const totalTokens = Math.round(inputTokens + outputTokens);
      
      // Update the pending message
      savedPendingMessage.content = aiResponse;
      savedPendingMessage.status = MessageStatus.COMPLETED;
      savedPendingMessage.processingTime = processingTime;
      savedPendingMessage.tokens = totalTokens;
      
      const completedMessage = await this.chatMessageRepository.save(savedPendingMessage);
      
      // Update session
      session.messageCount += 1;
      session.totalTokens = (session.totalTokens || 0) + totalTokens;
      session.lastMessageAt = new Date();
      
      // Update session title if it's a new conversation
      if (session.messageCount <= 3 && session.title === 'New Chat') {
        // Generate a title based on the conversation
        session.title = userMessage.length > 30 
          ? `${userMessage.substring(0, 30)}...` 
          : userMessage;
      }
      
      await this.chatSessionRepository.save(session);
      
      return completedMessage;
    } catch (error) {
      this.logger.error(`Error generating chat response: ${error.message}`);
      throw error;
    }
  }

  async getMessagesBySessionId(sessionId: string, userId: string): Promise<ChatMessage[]> {
    try {
      await this.findSessionById(sessionId, userId);
      
      return this.chatMessageRepository.find({
        where: { sessionId },
        order: { createdAt: 'ASC' },
      });
    } catch (error) {
      this.logger.error(`Error getting messages: ${error.message}`);
      throw error;
    }
  }

  async removeMessage(messageId: string, userId: string): Promise<void> {
    try {
      const message = await this.chatMessageRepository.findOne({
        where: { id: messageId, userId },
        relations: ['session'],
      });
      
      if (!message) {
        throw new NotFoundException(`Message with ID "${messageId}" not found`);
      }
      
      // Instead of deleting, mark as hidden
      message.isHidden = true;
      await this.chatMessageRepository.save(message);
      
      // Update session count
      const session = message.session;
      if (session) {
        session.messageCount = Math.max(0, session.messageCount - 1);
        await this.chatSessionRepository.save(session);
      }
    } catch (error) {
      this.logger.error(`Error removing message: ${error.message}`);
      throw error;
    }
  }
}