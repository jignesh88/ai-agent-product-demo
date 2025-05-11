import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, ParseUUIDPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { ChatSession, SessionStatus } from '../entities/chat-session.entity';
import { ChatMessage, MessageRole } from '../entities/chat-message.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { Request } from 'express';

interface CustomRequest extends Request {
  user: { id: string };
}

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // Session endpoints
  @Post('sessions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new chat session' })
  @ApiResponse({ status: 201, description: 'Chat session created successfully' })
  async createSession(
    @Body() createSessionDto: { title: string; description?: string },
    @Req() req: CustomRequest,
  ): Promise<ChatSession> {
    const userId = req.user['id'];
    return this.chatService.createSession(
      userId,
      createSessionDto.title,
      createSessionDto.description,
    );
  }

  @Get('sessions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all chat sessions for the current user' })
  @ApiQuery({ name: 'status', enum: SessionStatus, required: false })
  @ApiResponse({ status: 200, description: 'Chat sessions retrieved successfully' })
  async findAllSessions(
    @Query('status') status: SessionStatus,
    @Req() req: CustomRequest,
  ): Promise<ChatSession[]> {
    const userId = req.user['id'];
    return this.chatService.findAllSessions(userId, status);
  }

  @Get('sessions/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a chat session by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Session ID' })
  @ApiResponse({ status: 200, description: 'Chat session retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Chat session not found' })
  async findSessionById(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: CustomRequest,
  ): Promise<ChatSession> {
    const userId = req.user['id'];
    return this.chatService.findSessionById(id, userId);
  }

  @Patch('sessions/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a chat session' })
  @ApiParam({ name: 'id', type: 'string', description: 'Session ID' })
  @ApiResponse({ status: 200, description: 'Chat session updated successfully' })
  @ApiResponse({ status: 404, description: 'Chat session not found' })
  async updateSession(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSessionDto: Partial<ChatSession>,
    @Req() req: CustomRequest,
  ): Promise<ChatSession> {
    const userId = req.user['id'];
    return this.chatService.updateSession(id, userId, updateSessionDto);
  }

  @Delete('sessions/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a chat session' })
  @ApiParam({ name: 'id', type: 'string', description: 'Session ID' })
  @ApiResponse({ status: 204, description: 'Chat session deleted successfully' })
  @ApiResponse({ status: 404, description: 'Chat session not found' })
  async deleteSession(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: CustomRequest,
  ): Promise<void> {
    const userId = req.user['id'];
    return this.chatService.deleteSession(id, userId);
  }

  @Patch('sessions/:id/archive')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Archive a chat session' })
  @ApiParam({ name: 'id', type: 'string', description: 'Session ID' })
  @ApiResponse({ status: 200, description: 'Chat session archived successfully' })
  @ApiResponse({ status: 404, description: 'Chat session not found' })
  async archiveSession(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: CustomRequest,
  ): Promise<ChatSession> {
    const userId = req.user['id'];
    return this.chatService.archiveSession(id, userId);
  }

  @Post('sessions/:id/share')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Share a chat session' })
  @ApiParam({ name: 'id', type: 'string', description: 'Session ID' })
  @ApiResponse({ status: 200, description: 'Chat session shared successfully' })
  @ApiResponse({ status: 404, description: 'Chat session not found' })
  async shareSession(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: CustomRequest,
  ): Promise<{ shareCode: string }> {
    const userId = req.user['id'];
    return this.chatService.shareSession(id, userId);
  }

  @Delete('sessions/:id/share')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Stop sharing a chat session' })
  @ApiParam({ name: 'id', type: 'string', description: 'Session ID' })
  @ApiResponse({ status: 200, description: 'Chat session unshared successfully' })
  @ApiResponse({ status: 404, description: 'Chat session not found' })
  async unshareSession(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: CustomRequest,
  ): Promise<ChatSession> {
    const userId = req.user['id'];
    return this.chatService.unshareSession(id, userId);
  }

  @Get('shared/:shareCode')
  @ApiOperation({ summary: 'Get a shared chat session by share code' })
  @ApiParam({ name: 'shareCode', type: 'string', description: 'Share code' })
  @ApiResponse({ status: 200, description: 'Shared chat session retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Shared chat session not found' })
  async getSharedSession(
    @Param('shareCode') shareCode: string,
  ): Promise<ChatSession> {
    return this.chatService.getSessionByShareCode(shareCode);
  }

  // Message endpoints
  @Get('sessions/:id/messages')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all messages for a chat session' })
  @ApiParam({ name: 'id', type: 'string', description: 'Session ID' })
  @ApiResponse({ status: 200, description: 'Chat messages retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Chat session not found' })
  async getMessages(
    @Param('id', ParseUUIDPipe) sessionId: string,
    @Req() req: CustomRequest,
  ): Promise<ChatMessage[]> {
    const userId = req.user['id'];
    return this.chatService.getMessagesBySessionId(sessionId, userId);
  }

  @Post('sessions/:id/messages')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new message to a chat session' })
  @ApiParam({ name: 'id', type: 'string', description: 'Session ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        content: { type: 'string' },
        role: { type: 'string', enum: Object.values(MessageRole) },
      },
      required: ['content'],
    },
  })
  @ApiResponse({ status: 201, description: 'Chat message added successfully' })
  @ApiResponse({ status: 404, description: 'Chat session not found' })
  async addMessage(
    @Param('id', ParseUUIDPipe) sessionId: string,
    @Body() messageDto: { content: string; role?: MessageRole },
    @Req() req: CustomRequest,
  ): Promise<ChatMessage> {
    const userId = req.user['id'];
    return this.chatService.addMessage(
      sessionId,
      userId,
      messageDto.content,
      messageDto.role,
    );
  }

  @Post('sessions/:id/generate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate an AI response to a user message' })
  @ApiParam({ name: 'id', type: 'string', description: 'Session ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  })
  @ApiResponse({ status: 201, description: 'AI response generated successfully' })
  @ApiResponse({ status: 404, description: 'Chat session not found' })
  async generateResponse(
    @Param('id', ParseUUIDPipe) sessionId: string,
    @Body('message') message: string,
    @Req() req: CustomRequest,
  ): Promise<ChatMessage> {
    const userId = req.user['id'];
    return this.chatService.generateResponse(sessionId, userId, message);
  }

  @Delete('messages/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a message from a chat session' })
  @ApiParam({ name: 'id', type: 'string', description: 'Message ID' })
  @ApiResponse({ status: 204, description: 'Chat message removed successfully' })
  @ApiResponse({ status: 404, description: 'Chat message not found' })
  async removeMessage(
    @Param('id', ParseUUIDPipe) messageId: string,
    @Req() req: CustomRequest,
  ): Promise<void> {
    const userId = req.user['id'];
    return this.chatService.removeMessage(messageId, userId);
  }
}