import { Injectable } from '@nestjs/common';
import { VehiculeRepositrory } from './vehicule.repository';

@Injectable()
export class VehiculeService {
    constructor(private readonly VehiculeRepositrory:VehiculeRepositrory
        
    ){}
    
        operate(){
            this.VehiculeRepositrory.operate()
        }
}
