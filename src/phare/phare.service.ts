import { Injectable } from '@nestjs/common';
import { PharaeRepository } from './phare.repository';

@Injectable()
export class PhareService {

    constructor(private readonly phareRepository:PharaeRepository){}
    
        turnOn(){
            this.phareRepository.turnOn()
        }
}
