
import { Injectable } from "@nestjs/common";
import { MoteurRepository } from "src/moteur/moteur.repository";


@Injectable()
export class GenerateurRepository {
constructor(private readonly moteurRepository:MoteurRepository){}
 generateurPower(){
    this.moteurRepository.start()
    console.log("generateur en fonctionnement ")
    
 }
}