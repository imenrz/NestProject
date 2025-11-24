import { Injectable } from '@nestjs/common';
import { GenerateurRepository } from './generateur.repository';

@Injectable()
export class GenerateurService {

    constructor(private readonly generateurRepository:GenerateurRepository){}

        generatePower(){
            this.generateurRepository.generateurPower()

        }
    }

