import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ChatSession } from './chat-session.entity';

export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}

export enum MessageStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Entity('chat_messages')
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: MessageRole,
    default: MessageRole.USER,
  })
  role: MessageRole;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'enum',
    enum: MessageStatus,
    default: MessageStatus.COMPLETED,
  })
  status: MessageStatus;

  @Column({ nullable: true })
  tokens: number;

  @Column({ nullable: true })
  processingTime: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => ChatSession, (session) => session.messages, { 
    onDelete: 'CASCADE' 
  })
  @JoinColumn({ name: 'sessionId' })
  session: ChatSession;

  @Column()
  sessionId: string;

  @Column({ nullable: true })
  modelId: string;

  @Column({ nullable: true })
  parentMessageId: string;

  @Column({ default: false })
  isHidden: boolean;

  @Column({ nullable: true, type: 'json' })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Helper methods
  get isUserMessage(): boolean {
    return this.role === MessageRole.USER;
  }

  get isAssistantMessage(): boolean {
    return this.role === MessageRole.ASSISTANT;
  }

  get isSystemMessage(): boolean {
    return this.role === MessageRole.SYSTEM;
  }

  get isCompleted(): boolean {
    return this.status === MessageStatus.COMPLETED;
  }

  get isFailed(): boolean {
    return this.status === MessageStatus.FAILED;
  }

  get isProcessing(): boolean {
    return this.status === MessageStatus.PROCESSING || this.status === MessageStatus.PENDING;
  }
}