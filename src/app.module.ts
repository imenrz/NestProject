import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesController } from './messages/messages.controller';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';


@Module({
  imports: [UsersModule],
  controllers: [AppController, MessagesController, UsersController], 
  providers: [AppService],
})
export class AppModule {}
