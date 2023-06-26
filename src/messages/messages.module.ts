import { Module } from '@nestjs/common';
import { MessageService } from './messages.service';
import { MessageGateway } from './messages.gateway';

@Module({
  providers: [MessageGateway, MessageService],
})
export class MessageModule {}
