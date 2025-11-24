import { Controller, Get } from '@nestjs/common';
import { PhareService } from './phare.service';

@Controller('phare')
export class PhareController {

    constructor(private readonly pharesService:PhareService){}

    @Get('/turnOn')
    turnOn(){
this.pharesService.turnOn()
return "phare allumé"
    }

}
