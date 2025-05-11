import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import twilio from 'twilio';
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
import { BedrockService } from '../../chat/ai/bedrock/bedrock.service';

@Injectable()
export class TwilioService {
  private readonly logger = new Logger(TwilioService.name);
  private twilioClient: twilio.Twilio;
  private accountSid: string;
  private authToken: string;
  private twilioPhoneNumber: string;

  constructor(
    private configService: ConfigService,
    private bedrockService: BedrockService,
  ) {
    this.accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID') || '';
    this.authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN') || '';
    this.twilioPhoneNumber = this.configService.get<string>('TWILIO_PHONE_NUMBER') || '';

    if (this.accountSid && this.authToken) {
      this.twilioClient = twilio(this.accountSid, this.authToken);
    } else {
      this.logger.warn('Twilio credentials not found. Twilio service will be limited.');
    }
  }

  generateVoiceResponse(message: string): string {
    const twiml = new VoiceResponse();
    twiml.say({ voice: 'Polly.Amy' }, message);
    return twiml.toString();
  }

  generateGatherResponse(promptMessage: string, actionUrl: string): string {
    const twiml = new VoiceResponse();
    const gather = twiml.gather({
      input: ['speech'],
      action: actionUrl,
      method: 'POST',
      speechTimeout: 'auto',
      speechModel: 'phone_call',
      enhanced: true,
      language: 'en-US',
    });
    
    gather.say({ voice: 'Polly.Amy' }, promptMessage);
    
    // Add a fallback if nothing is captured
    twiml.say(
      { voice: 'Polly.Amy' },
      'I didn\'t hear anything. Please call back when you\'re ready to speak.',
    );
    twiml.hangup();
    
    return twiml.toString();
  }

  async transcribeSpeech(recordingUrl: string): Promise<string> {
    try {
      if (!this.twilioClient) {
        throw new Error('Twilio client not initialized');
      }
      
      // In a real implementation, you would use Twilio's Speech-to-Text API
      // or retrieve the transcription from the recording
      // This is a simplified implementation
      this.logger.log(`Transcribing speech from ${recordingUrl}`);
      
      // Mock implementation
      return 'Transcribed speech would appear here in a real implementation.';
    } catch (error) {
      this.logger.error(`Error transcribing speech: ${error.message}`);
      throw error;
    }
  }

  async initiateOutboundCall(
    to: string,
    webhookUrl: string,
  ): Promise<{ callSid: string }> {
    try {
      if (!this.twilioClient) {
        throw new Error('Twilio client not initialized');
      }
      
      const call = await this.twilioClient.calls.create({
        to,
        from: this.twilioPhoneNumber,
        url: webhookUrl,
        statusCallback: `${webhookUrl}/status-callback`,
        statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
        statusCallbackMethod: 'POST',
      });
      
      this.logger.log(`Initiated call to ${to}, Call SID: ${call.sid}`);
      
      return { callSid: call.sid };
    } catch (error) {
      this.logger.error(`Error initiating call: ${error.message}`);
      throw error;
    }
  }

  async sendSMS(to: string, message: string): Promise<{ messageSid: string }> {
    try {
      if (!this.twilioClient) {
        throw new Error('Twilio client not initialized');
      }
      
      const smsMessage = await this.twilioClient.messages.create({
        to,
        from: this.twilioPhoneNumber,
        body: message,
      });
      
      this.logger.log(`Sent SMS to ${to}, Message SID: ${smsMessage.sid}`);
      
      return { messageSid: smsMessage.sid };
    } catch (error) {
      this.logger.error(`Error sending SMS: ${error.message}`);
      throw error;
    }
  }

  async getCallRecordings(callSid: string): Promise<any[]> {
    try {
      if (!this.twilioClient) {
        throw new Error('Twilio client not initialized');
      }
      
      const recordings = await this.twilioClient.recordings.list({
        callSid,
      });
      
      return recordings;
    } catch (error) {
      this.logger.error(`Error getting call recordings: ${error.message}`);
      throw error;
    }
  }

  async generateAIResponseToVoiceInput(input: string): Promise<string> {
    try {
      // Use the Bedrock service to generate a response
      const prompt = `You are a helpful voice assistant. The user said: "${input}". Provide a concise and helpful response.`;
      
      const response = await this.bedrockService.generateResponse(prompt);
      
      // Clean up the response for TTS
      const cleanResponse = response
        .replace(/\*\*/g, '') // Remove markdown bold
        .replace(/\n\n/g, ' ') // Replace double newlines with space
        .replace(/\n/g, ' '); // Replace single newlines with space
      
      return cleanResponse;
    } catch (error) {
      this.logger.error(`Error generating AI response: ${error.message}`);
      throw error;
    }
  }
}