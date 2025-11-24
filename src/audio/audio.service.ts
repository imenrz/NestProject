import { Injectable } from '@nestjs/common';
import { GenerateurRepository } from 'src/generateur/generateur.repository';

@Injectable()
export class AudioService {

    constructor(private readonly generateurRepository:GenerateurRepository){}

    playMusic(){
        this.generateurRepository.generateurPower()
    }
}
