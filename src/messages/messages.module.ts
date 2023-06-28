import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { MessageService } from './messages.service';
import { MessageGateway } from './messages.gateway';
import { User } from '../auth/entities/user.entity';

@Module({
  providers: [MessageGateway, MessageService],
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
})
export class MessageModule {}
