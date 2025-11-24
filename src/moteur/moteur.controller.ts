import { Controller, Get } from '@nestjs/common';
import { MoteurService } from './moteur.service';

@Controller('moteur')
export class MoteurController {

    constructor(private readonly moteurservice:MoteurService){}


        @Get('/start')
        startMoteur(){
return this.moteurservice.startMoteur()


}

@Get('/status')
getStatus(){
       return this.moteurservice.getStatus()
 
}
    }

