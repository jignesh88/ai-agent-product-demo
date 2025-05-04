import { Module } from '@nestjs/common';
import { DocumentsController } from './controllers/documents.controller';
import { DocumentsService } from './services/documents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { ConfigModule } from '@nestjs/config';
import { TextractService } from './processors/textract/textract.service';
import { S3Service } from '../common/services/s3.service';
import { EmbeddingsService } from '../chat/ai/embeddings/embeddings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document]),
    ConfigModule,
  ],
  controllers: [DocumentsController],
  providers: [
    DocumentsService,
    TextractService,
    S3Service,
    EmbeddingsService,
  ],
  exports: [DocumentsService],
})
export class DocumentsModule {}
