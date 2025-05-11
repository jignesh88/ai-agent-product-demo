import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ChatMessage } from './chat-message.entity';

export enum SessionStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  DELETED = 'deleted',
}

@Entity('chat_sessions')
export class ChatSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  contextId: string;

  @Column({
    type: 'enum',
    enum: SessionStatus,
    default: SessionStatus.ACTIVE,
  })
  status: SessionStatus;

  @Column({ default: false })
  isStarred: boolean;

  @Column({ default: false })
  isShared: boolean;

  @Column({ nullable: true })
  shareCode: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column({ nullable: true })
  modelId: string;

  @Column({ nullable: true, type: 'json' })
  settings: Record<string, any>;

  @Column({ nullable: true, type: 'json' })
  metadata: Record<string, any>;

  @OneToMany(() => ChatMessage, (message) => message.session)
  messages: ChatMessage[];

  @Column({ default: 0 })
  messageCount: number;

  @Column({ default: 0 })
  totalTokens: number;

  @Column({ nullable: true })
  lastMessageAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Helper methods
  get isActive(): boolean {
    return this.status === SessionStatus.ACTIVE;
  }

  get isArchived(): boolean {
    return this.status === SessionStatus.ARCHIVED;
  }

  get isDeleted(): boolean {
    return this.status === SessionStatus.DELETED;
  }

  get shortTitle(): string {
    return this.title?.length > 30 ? `${this.title.substring(0, 30)}...` : this.title;
  }
}