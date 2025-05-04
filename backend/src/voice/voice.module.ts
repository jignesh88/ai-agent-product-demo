import { Module } from '@nestjs/common';
import { VoiceController } from './controllers/voice.controller';
import { VoiceService } from './services/voice.service';
import { TwilioService } from './twilio/twilio.service';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [
    ConfigModule,
    ChatModule,
  ],
  controllers: [VoiceController],
  providers: [
    VoiceService,
    TwilioService,
  ],
  exports: [VoiceService, TwilioService],
})
export class VoiceModule {}
