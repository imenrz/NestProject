import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesController } from './messages/messages.controller';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { MoteurModule } from './moteur/moteur.module';
import { GenerateurModule } from './generateur/generateur.module';
import { PhareModule } from './phare/phare.module';
import { AudioModule } from './audio/audio.module';
import { VehiculeModule } from './vehicule/vehicule.module';

@Global()
@Module({
  imports: [UsersModule, MoteurModule, GenerateurModule, PhareModule, AudioModule, VehiculeModule],
  controllers: [AppController, MessagesController, UsersController], 
  providers: [AppService],
})
export class AppModule {}
