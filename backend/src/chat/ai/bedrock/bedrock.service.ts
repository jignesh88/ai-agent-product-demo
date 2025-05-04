import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';

@Injectable()
export class BedrockService {
  private readonly logger = new Logger(BedrockService.name);
  private bedrockClient: BedrockRuntimeClient;
  private modelId: string;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('BEDROCK_REGION', 'us-east-1');
    this.modelId = this.configService.get<string>('BEDROCK_MODEL_ID', 'anthropic.claude-v2');

    this.bedrockClient = new BedrockRuntimeClient({
      region,
    });
  }

  async generateResponse(
    prompt: string,
    context?: string,
    maxTokens = 1000,
    temperature = 0.7,
  ): Promise<string> {
    try {
      const fullPrompt = context
        ? `\n\nHuman: ${context}\n\n${prompt}\n\nAssistant:`
        : `\n\nHuman: ${prompt}\n\nAssistant:`;

      const params = {
        modelId: this.modelId,
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
          prompt: fullPrompt,
          max_tokens_to_sample: maxTokens,
          temperature: temperature,
          top_p: 0.9,
        }),
      };

      const command = new InvokeModelCommand(params);
      const response = await this.bedrockClient.send(command);

      // Parse the response
      const responseBody = JSON.parse(
        new TextDecoder().decode(response.body),
      );

      return responseBody.completion || '';
    } catch (error) {
      this.logger.error(`Error generating response from Bedrock: ${error.message}`);
      throw error;
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    try {
      // Note: This is a simplified implementation
      // In a real application, you would use a proper embedding model
      // For now, we're just returning a mock embedding
      return Array.from({ length: 384 }, () => Math.random() * 2 - 1);
    } catch (error) {
      this.logger.error(`Error generating embedding: ${error.message}`);
      throw error;
    }
  }
}
