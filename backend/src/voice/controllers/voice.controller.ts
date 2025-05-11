import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  UseGuards, 
  Req, 
  Res, 
  HttpStatus,
  Query,
  Headers,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { VoiceService } from '../services/voice.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam, ApiHeader } from '@nestjs/swagger';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import * as twilio from 'twilio';

interface CustomRequest extends Request {
  user: { id: string };
}

@ApiTags('voice')
@Controller('voice')
export class VoiceController {
  private readonly logger = new Logger(VoiceController.name);
  private twilioAuthToken: string;

  constructor(
    private readonly voiceService: VoiceService,
    private configService: ConfigService,
  ) {
    this.twilioAuthToken = this.configService.get<string>('TWILIO_AUTH_TOKEN') || '';
  }

  private validateTwilioRequest(req: any, res: Response): boolean {
    // Skip validation in development mode
    if (process.env.NODE_ENV === 'development' && process.env.SKIP_TWILIO_VALIDATION === 'true') {
      return true;
    }

    // Validate that the request came from Twilio
    const twilioSignature = req.headers['x-twilio-signature'];
    
    if (!twilioSignature || !this.twilioAuthToken) {
      return false;
    }

    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const requestIsValid = twilio.validateRequest(
      this.twilioAuthToken,
      twilioSignature,
      url,
      req.body,
    );

    return requestIsValid;
  }

  @Post('incoming')
  @ApiOperation({ summary: 'Handle incoming voice calls from Twilio' })
  @ApiHeader({ name: 'x-twilio-signature', description: 'Twilio signature for request validation' })
  @ApiResponse({ status: 200, description: 'TwiML response for the call' })
  @ApiResponse({ status: 401, description: 'Unauthorized request' })
  async handleIncomingCall(@Req() req: any, @Res() res: Response): Promise<void> {
    try {
      if (!this.validateTwilioRequest(req, res)) {
        this.logger.warn('Invalid Twilio request signature');
        throw new UnauthorizedException('Invalid Twilio signature');
      }

      const twimlResponse = await this.voiceService.handleIncomingCall();
      
      res.setHeader('Content-Type', 'text/xml');
      res.status(HttpStatus.OK).send(twimlResponse);
    } catch (error) {
      this.logger.error(`Error handling incoming call: ${error.message}`);
      
      if (error instanceof UnauthorizedException) {
        res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');
        return;
      }
      
      // Return a simple TwiML response for other errors
      const errorTwiml = '<?xml version="1.0" encoding="UTF-8"?><Response><Say>An error occurred. Please try again later.</Say><Hangup/></Response>';
      res.setHeader('Content-Type', 'text/xml');
      res.status(HttpStatus.OK).send(errorTwiml);
    }
  }

  @Post('respond')
  @ApiOperation({ summary: 'Handle voice responses from user during a call' })
  @ApiHeader({ name: 'x-twilio-signature', description: 'Twilio signature for request validation' })
  @ApiResponse({ status: 200, description: 'TwiML response for the call' })
  async handleVoiceResponse(
    @Body('SpeechResult') speechInput: string,
    @Body('CallSid') callSid: string,
    @Req() req: any,
    @Res() res: Response,
  ): Promise<void> {
    try {
      if (!this.validateTwilioRequest(req, res)) {
        this.logger.warn('Invalid Twilio request signature');
        throw new UnauthorizedException('Invalid Twilio signature');
      }

      const twimlResponse = await this.voiceService.handleVoiceInput(speechInput, callSid);
      
      res.setHeader('Content-Type', 'text/xml');
      res.status(HttpStatus.OK).send(twimlResponse);
    } catch (error) {
      this.logger.error(`Error handling voice response: ${error.message}`);
      
      if (error instanceof UnauthorizedException) {
        res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');
        return;
      }
      
      // Return a simple TwiML response for other errors
      const errorTwiml = '<?xml version="1.0" encoding="UTF-8"?><Response><Say>An error occurred. Please try again later.</Say><Gather action="/api/voice/respond" method="POST" speechTimeout="auto"><Say>Let\'s try again. How can I help you?</Say></Gather></Response>';
      res.setHeader('Content-Type', 'text/xml');
      res.status(HttpStatus.OK).send(errorTwiml);
    }
  }

  @Post('outbound-call')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Initiate an outbound call to a phone number' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phoneNumber: { type: 'string', example: '+15551234567' },
        message: { type: 'string', example: 'Hello, this is an important message.' },
      },
      required: ['phoneNumber'],
    },
  })
  @ApiResponse({ status: 201, description: 'Call initiated successfully' })
  async initiateOutboundCall(
    @Body('phoneNumber') phoneNumber: string,
    @Body('message') message: string,
    @Req() req: CustomRequest,
  ): Promise<{ callSid: string }> {
    const userId = req.user.id;
    return this.voiceService.initiateOutboundCall(phoneNumber, userId, message);
  }

  @Post('outbound-webhook')
  @ApiOperation({ summary: 'Webhook for outbound calls to provide TwiML' })
  @ApiHeader({ name: 'x-twilio-signature', description: 'Twilio signature for request validation' })
  @ApiResponse({ status: 200, description: 'TwiML response for the call' })
  async handleOutboundWebhook(@Req() req: any, @Res() res: Response): Promise<void> {
    try {
      if (!this.validateTwilioRequest(req, res)) {
        this.logger.warn('Invalid Twilio request signature');
        throw new UnauthorizedException('Invalid Twilio signature');
      }

      const twimlResponse = await this.voiceService.handleOutboundCallWebhook();
      
      res.setHeader('Content-Type', 'text/xml');
      res.status(HttpStatus.OK).send(twimlResponse);
    } catch (error) {
      this.logger.error(`Error handling outbound webhook: ${error.message}`);
      
      if (error instanceof UnauthorizedException) {
        res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');
        return;
      }
      
      // Return a simple TwiML response for other errors
      const errorTwiml = '<?xml version="1.0" encoding="UTF-8"?><Response><Say>An error occurred. Goodbye.</Say><Hangup/></Response>';
      res.setHeader('Content-Type', 'text/xml');
      res.status(HttpStatus.OK).send(errorTwiml);
    }
  }

  @Post('status-callback')
  @ApiOperation({ summary: 'Handle status callbacks from Twilio' })
  @ApiHeader({ name: 'x-twilio-signature', description: 'Twilio signature for request validation' })
  @ApiResponse({ status: 200, description: 'Status callback processed' })
  async handleStatusCallback(
    @Body('CallStatus') callStatus: string,
    @Body('CallSid') callSid: string,
    @Req() req: any,
    @Res() res: Response,
  ): Promise<void> {
    try {
      if (!this.validateTwilioRequest(req, res)) {
        this.logger.warn('Invalid Twilio request signature');
        throw new UnauthorizedException('Invalid Twilio signature');
      }

      await this.voiceService.handleStatusCallback(callStatus, callSid);
      
      res.status(HttpStatus.OK).send('Status callback processed');
    } catch (error) {
      this.logger.error(`Error handling status callback: ${error.message}`);
      
      if (error instanceof UnauthorizedException) {
        res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');
        return;
      }
      
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error processing status callback');
    }
  }

  @Post('transcribe/:callSid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Transcribe a call recording' })
  @ApiParam({ name: 'callSid', type: 'string', description: 'Twilio Call SID' })
  @ApiResponse({ status: 200, description: 'Call transcribed successfully' })
  async transcribeCall(
    @Param('callSid') callSid: string,
  ): Promise<{ transcription: string }> {
    const transcription = await this.voiceService.transcribeCallRecording(callSid);
    return { transcription };
  }

  @Post('notify')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send SMS notification' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phoneNumber: { type: 'string', example: '+15551234567' },
        message: { type: 'string', example: 'Your voice assistant notification.' },
      },
      required: ['phoneNumber', 'message'],
    },
  })
  @ApiResponse({ status: 201, description: 'Notification sent successfully' })
  async sendNotification(
    @Body('phoneNumber') phoneNumber: string,
    @Body('message') message: string,
  ): Promise<{ messageSid: string }> {
    return this.voiceService.sendVoiceNotification(phoneNumber, message);
  }
}