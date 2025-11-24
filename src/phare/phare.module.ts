import { Module } from '@nestjs/common';
import { PhareService } from './phare.service';
import { PharaeRepository } from './phare.repository';
import { GenerateurModule } from 'src/generateur/generateur.module';
import { PhareController } from './phare.controller';

@Module({
  imports:[GenerateurModule],
  providers: [PhareService,PharaeRepository],
  exports:[PharaeRepository],
  controllers: [PhareController]
})
export class PhareModule {}
