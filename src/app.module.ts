import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module'; // Add this
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { MoteurModule } from './moteur/moteur.module';
import { GenerateurModule } from './generateur/generateur.module';
import { PhareModule } from './phare/phare.module';
import { AudioModule } from './audio/audio.module';
import { VehiculeModule } from './vehicule/vehicule.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messages/messages.entity';
import { User } from './users/users.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'test',
      entities: [Message,User],
      synchronize: true,
    }),
    MessagesModule, // Add this line
    UsersModule,
    MoteurModule,
    GenerateurModule,
    PhareModule,
    AudioModule,
    VehiculeModule
  ],
  controllers: [AppController], // Remove MessagesController from here
  providers: [AppService],
})
export class AppModule {}