import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messages.entity';
import { MessagesService } from './messages.service';
import { ChatGateway } from './chat/chat.gateway';


@Module({
  imports:[TypeOrmModule.forFeature([Message])],
  controllers: [MessagesController],
  providers:[MessagesService, ChatGateway]
})
export class MessagesModule {}
