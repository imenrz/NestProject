import { Global, Module } from '@nestjs/common';
import { VehiculeService } from './vehicule.service';
import { VehiculeRepositrory } from './vehicule.repository';
import { PhareModule } from 'src/phare/phare.module';
import { AudioModule } from 'src/audio/audio.module';
import { GenerateurModule } from 'src/generateur/generateur.module';
import { MoteurModule } from 'src/moteur/moteur.module';
import { VehiculeController } from './vehicule.controller';

@Module({
  imports:[PhareModule,AudioModule],
  providers: [VehiculeService,VehiculeRepositrory],
  exports:[VehiculeService,VehiculeRepositrory],
  controllers: [VehiculeController]
})
export class VehiculeModule {}
