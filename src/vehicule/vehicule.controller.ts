import { Controller, Get } from '@nestjs/common';
import { VehiculeService } from './vehicule.service';

@Controller('vehicule')
export class VehiculeController {

    constructor(private readonly vehiculeService:VehiculeService){}

    @Get('/operate')
    operate(){
        this.vehiculeService.operate()
        return 'vehicule en fonctionnement'
    }
}
