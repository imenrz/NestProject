import { Injectable } from "@nestjs/common";
import { AudioRepository } from "src/audio/audio.repository";
import { PharaeRepository } from "src/phare/phare.repository";

@Injectable()
export class VehiculeRepositrory{
constructor(private readonly phareRepository:PharaeRepository,
    private readonly audioRepositoru:AudioRepository,
){}
     
operate(){
    this.phareRepository.turnOn(),
    this.audioRepositoru.playMusic(),
    console.log("la vehicule fonctionne")
}

}