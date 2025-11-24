import { Controller, Get } from '@nestjs/common';
import { AudioService } from './audio.service';

@Controller('audio')
export class AudioController {

    constructor(private readonly audioService:AudioService){}


    @Get('/music')
    musicPlay(){
        this.audioService.playMusic()
        return 'music play'
    }
}
