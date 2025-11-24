import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { AudioRepository } from './audio.repository';
import { GenerateurModule } from 'src/generateur/generateur.module';
import { AudioController } from './audio.controller';

@Module({
  imports:[GenerateurModule],
  providers: [AudioService,AudioRepository],
  exports:[AudioRepository],
  controllers: [AudioController]
})
export class AudioModule {}
