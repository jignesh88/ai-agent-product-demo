import { Module } from '@nestjs/common';
import { ChatController } from './controllers/chat.controller';
import { ChatService } from './services/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './entities/chat-message.entity';
import { ChatSession } from './entities/chat-session.entity';
import { ConfigModule } from '@nestjs/config';
import { BedrockService } from './ai/bedrock/bedrock.service';
import { EmbeddingsService } from './ai/embeddings/embeddings.service';
import { PromptsService } from './ai/prompts/prompts.service';
import { DocumentsModule } from '../documents/documents.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatMessage, ChatSession]),
    ConfigModule,
    DocumentsModule,
  ],
  controllers: [ChatController],
  providers: [
    ChatService,
    BedrockService,
    EmbeddingsService,
    PromptsService,
  ],
  exports: [ChatService, BedrockService, EmbeddingsService],
})
export class ChatModule {}
