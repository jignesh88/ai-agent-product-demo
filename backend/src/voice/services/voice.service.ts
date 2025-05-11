import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwilioService } from '../twilio/twilio.service';
import { BedrockService } from '../../chat/ai/bedrock/bedrock.service';
import { ChatService } from '../../chat/services/chat.service';

@Injectable()
export class VoiceService {
  private readonly logger = new Logger(VoiceService.name);
  private baseUrl: string;

  constructor(
    private configService: ConfigService,
    private twilioService: TwilioService,
    private bedrockService: BedrockService,
    private chatService: ChatService,
  ) {
    this.baseUrl = this.configService.get<string>('API_BASE_URL', 'http://localhost:3000');
  }

  async handleIncomingCall(): Promise<string> {
    try {
      const welcomeMessage = 'Hello! This is your AI voice assistant. How can I help you today?';
      const gatherUrl = `${this.baseUrl}/api/voice/respond`;
      
      return this.twilioService.generateGatherResponse(welcomeMessage, gatherUrl);
    } catch (error) {
      this.logger.error(`Error handling incoming call: ${error.message}`);
      throw error;
    }
  }

  async handleVoiceInput(speechInput: string, callSid: string): Promise<string> {
    try {
      this.logger.log(`Received voice input: ${speechInput}`);
      
      // Generate AI response
      const aiResponse = await this.twilioService.generateAIResponseToVoiceInput(speechInput);
      
      // Save conversation in chat service if needed
      // This could create a chat session and store the interaction
      
      // Generate voice response
      const responseMessage = aiResponse || 'I\'m sorry, I couldn\'t generate a response. Please try again.';
      const gatherUrl = `${this.baseUrl}/api/voice/respond`;
      
      return this.twilioService.generateGatherResponse(responseMessage, gatherUrl);
    } catch (error) {
      this.logger.error(`Error handling voice input: ${error.message}`);
      
      // Return a fallback response
      const fallbackMessage = 'I\'m sorry, I encountered an error processing your request. Please try again.';
      const gatherUrl = `${this.baseUrl}/api/voice/respond`;
      
      return this.twilioService.generateGatherResponse(fallbackMessage, gatherUrl);
    }
  }

  async initiateOutboundCall(to: string, userId: string, message?: string): Promise<{ callSid: string }> {
    try {
      const webhookUrl = `${this.baseUrl}/api/voice/outbound-webhook`;
      
      // Store call details or user preferences in a real implementation
      
      return this.twilioService.initiateOutboundCall(to, webhookUrl);
    } catch (error) {
      this.logger.error(`Error initiating outbound call: ${error.message}`);
      throw error;
    }
  }

  async handleOutboundCallWebhook(): Promise<string> {
    try {
      const outboundMessage = 'Hello! This is an automated call from your AI assistant. I have important information for you.';
      
      if (process.env.NODE_ENV === 'development') {
        this.logger.debug('Development mode: Simulating outbound call response');
      }
      
      return this.twilioService.generateVoiceResponse(outboundMessage);
    } catch (error) {
      this.logger.error(`Error handling outbound call webhook: ${error.message}`);
      
      // Return a fallback response
      return this.twilioService.generateVoiceResponse('An error occurred during this call. Goodbye.');
    }
  }

  async handleStatusCallback(callStatus: string, callSid: string): Promise<void> {
    try {
      this.logger.log(`Call ${callSid} status updated: ${callStatus}`);
      
      // In a real implementation, you would update call status in database
      // or trigger notifications based on call status
      
    } catch (error) {
      this.logger.error(`Error handling status callback: ${error.message}`);
      // Handle error but don't throw since this is a callback
    }
  }

  async transcribeCallRecording(callSid: string): Promise<string> {
    try {
      const recordings = await this.twilioService.getCallRecordings(callSid);
      
      if (!recordings || recordings.length === 0) {
        throw new Error(`No recordings found for call ${callSid}`);
      }
      
      // Get the most recent recording
      const latestRecording = recordings[0];
      const recordingUrl = `https://api.twilio.com/2010-04-01/Accounts/${latestRecording.accountSid}/Recordings/${latestRecording.sid}.mp3`;
      
      return this.twilioService.transcribeSpeech(recordingUrl);
    } catch (error) {
      this.logger.error(`Error transcribing call recording: ${error.message}`);
      throw error;
    }
  }

  async sendVoiceNotification(to: string, message: string): Promise<{ messageSid: string }> {
    try {
      return this.twilioService.sendSMS(to, message);
    } catch (error) {
      this.logger.error(`Error sending voice notification: ${error.message}`);
      throw error;
    }
  }
}