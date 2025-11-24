
import { Injectable } from "@nestjs/common";
import { GenerateurRepository } from "src/generateur/generateur.repository";



@Injectable()
export class AudioRepository {
constructor(private readonly genretauerRepository:GenerateurRepository){}
playMusic(){
    this.genretauerRepository.generateurPower()
    console.log("music play")
}
}