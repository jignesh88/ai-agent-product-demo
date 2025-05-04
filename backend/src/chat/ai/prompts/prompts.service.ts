import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PromptsService {
  private readonly logger = new Logger(PromptsService.name);

  constructor(private configService: ConfigService) {}

  getSystemPrompt(): string {
    return `You are an AI assistant for a company's customer support. 
Your goal is to provide helpful, accurate, and concise responses to customer inquiries.
Use the provided context to answer questions, but don't mention that you're using this context.
If you don't know the answer, politely say so rather than making up information.
Keep your responses professional but friendly.`;
  }

  getDocumentSearchPrompt(query: string): string {
    return `Given the following query, generate a search query that would help find relevant information in a document database:
    
Query: ${query}

Search Query:`;
  }

  getAnswerGenerationPrompt(query: string, context: string[]): string {
    const formattedContext = context.map((c, i) => `Document ${i + 1}:\n${c}`).join('\n\n');
    
    return `Answer the following question based on the provided context. If the context doesn't contain the information needed to answer the question, say "I don't have enough information to answer this question."

Context:
${formattedContext}

Question: ${query}

Answer:`;
  }

  getFollowUpQuestionsPrompt(conversation: string): string {
    return `Based on the following conversation, suggest 3 follow-up questions that the user might want to ask. Format them as a numbered list.

Conversation:
${conversation}

Follow-up questions:`;
  }

  getDocumentSummaryPrompt(document: string): string {
    return `Summarize the following document in a concise way, highlighting the key points:

${document}

Summary:`;
  }

  getCustomPrompt(template: string, variables: Record<string, string>): string {
    let prompt = template;
    
    for (const [key, value] of Object.entries(variables)) {
      prompt = prompt.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
    }
    
    return prompt;
  }
}
