
import { Injectable } from "@nestjs/common";
import { GenerateurRepository } from "src/generateur/generateur.repository";



@Injectable()
export class PharaeRepository {
constructor(private readonly genretauerRepository:GenerateurRepository){}
 turnOn(){
    this.genretauerRepository.generateurPower()
    console.log("phare allumé")
 }
}