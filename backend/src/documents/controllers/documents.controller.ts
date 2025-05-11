import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, ParseUUIDPipe, Query, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from '../services/documents.service';
import { Document, DocumentStatus } from '../entities/document.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('documents')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all documents for the current user' })
  @ApiResponse({ status: 200, description: 'Documents retrieved successfully' })
  async findAll(@Query('status') status: DocumentStatus, @Req() req: Request): Promise<Document[]> {
    const userId = req.user['id'];
    return this.documentsService.findAll(userId, status);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get document by ID' })
  @ApiResponse({ status: 200, description: 'Document retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request): Promise<Document> {
    const userId = req.user['id'];
    return this.documentsService.findOne(id, userId);
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload document' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        description: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Document uploaded successfully' })
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description: string,
    @Req() req: Request,
  ): Promise<Document> {
    const userId = req.user['id'];
    return this.documentsService.uploadDocument(file, description, userId);
  }

  @Post(':id/process')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Process document' })
  @ApiResponse({ status: 200, description: 'Document processing initiated' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async process(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request): Promise<Document> {
    const userId = req.user['id'];
    return this.documentsService.processDocument(id, userId);
  }

  @Get(':id/text')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get extracted text from document' })
  @ApiResponse({ status: 200, description: 'Text retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async getExtractedText(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request): Promise<{ text: string }> {
    const userId = req.user['id'];
    const document = await this.documentsService.findOne(id, userId);
    return { text: document.extractedText };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update document' })
  @ApiResponse({ status: 200, description: 'Document updated successfully' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDocumentDto: any,
    @Req() req: Request,
  ): Promise<Document> {
    const userId = req.user['id'];
    return this.documentsService.update(id, updateDocumentDto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete document' })
  @ApiResponse({ status: 200, description: 'Document deleted successfully' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request): Promise<void> {
    const userId = req.user['id'];
    return this.documentsService.remove(id, userId);
  }

  @Get(':id/presigned-url')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get presigned URL for document download' })
  @ApiResponse({ status: 200, description: 'Presigned URL generated successfully' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async getPresignedUrl(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request): Promise<{ url: string }> {
    const userId = req.user['id'];
    const url = await this.documentsService.getDownloadUrl(id, userId);
    return { url };
  }
}