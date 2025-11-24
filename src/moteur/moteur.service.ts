import { Injectable } from '@nestjs/common';
import { MoteurRepository } from './moteur.repository';

@Injectable()  
export class MoteurService {

constructor(private readonly moteurRepository:MoteurRepository){}

startMoteur(){
    this.moteurRepository.start()
   
}
getStatus(){
     this.moteurRepository.getStatus()
}
}
