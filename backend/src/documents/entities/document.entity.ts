import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum DocumentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  PROCESSED = 'processed',
  FAILED = 'failed',
}

export enum DocumentType {
  PDF = 'pdf',
  DOCX = 'docx',
  TXT = 'txt',
}

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  s3Key: string;

  @Column({ nullable: true })
  s3Bucket: string;

  @Column()
  contentType: string;

  @Column({
    type: 'enum',
    enum: DocumentType,
  })
  documentType: DocumentType;

  @Column({ nullable: true })
  size: number;

  @Column({
    type: 'enum',
    enum: DocumentStatus,
    default: DocumentStatus.PENDING,
  })
  status: DocumentStatus;

  @Column({ nullable: true })
  processingError: string;

  @Column({ nullable: true, type: 'text' })
  extractedText: string;

  @Column({ nullable: true })
  vectorStoreId: string;

  @Column({ default: false })
  isPublic: boolean;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Helper methods
  get isProcessed(): boolean {
    return this.status === DocumentStatus.PROCESSED;
  }

  get hasError(): boolean {
    return this.status === DocumentStatus.FAILED;
  }

  get isProcessing(): boolean {
    return this.status === DocumentStatus.PROCESSING || this.status === DocumentStatus.PENDING;
  }

  get fileExtension(): string {
    return this.name.split('.').pop().toLowerCase();
  }
}
