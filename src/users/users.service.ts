import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { ObjectId } from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async create(email: string, password: string): Promise<User> {
        try {
            const user = this.userRepository.create({ email, password, active: false });
            await this.userRepository.save(user);
            return user;
        } catch (error) {
            console.error("error lors de creation de user", error);
            throw new InternalServerErrorException("erreur lors de la creation");
        }
    }

    async findALL():Promise<User[]>{
        try{
       const list= await this.userRepository.find();
        if(list.length===0){
            throw new NotFoundException("Aucun user trouvé");
        }
        return list ; 
    }catch(error){
        throw new InternalServerErrorException("listevide")
    }
    }
    
    async findOneById(id: ObjectId): Promise<User> {
  try {
    const user = await this.userRepository.findOneBy({ id });
    
    if (!user) {
      throw new NotFoundException("User not found");
    }
    
    return user;
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error; // Re-throw NotFoundException, don't catch it
    }
    console.error("Error finding user:", error);
    throw new InternalServerErrorException("Server error");
  }
}

async findOneByEmail(email:string):Promise<User>{

    try{
        const user=await this.userRepository.findOneBy({email});
        if(!user){
            
            throw new NotFoundException("Cet utilisateur n'existe pas")

        }
        return user;
    }
    catch(error){

     console.error(error);
        throw new InternalServerErrorException("Erreur");
    }
}

async findActive():Promise<User[]>{
    try{
    const users=await this.userRepository.find({where:{active:true}});
  if (users.length === 0) {
        throw new NotFoundException("Aucun utilisateur actif trouvé");
      }

      return users; 
    }
    catch(error){

     console.error(error);
        throw new InternalServerErrorException("Erreur");
    }
}

async update(id: ObjectId, attrs: Partial<User>): Promise<User> {
try {
const user = await this.findOneById(id);
Object.assign(user, attrs);
await this.userRepository.save(user);
return user;
} catch (error) {
console.error("Erreur lors de l’opération de mise à jour:", error);
throw new InternalServerErrorException('Échec de la mise à jour de l’utilisateur');
}
}

async remove(id: ObjectId): Promise<void> {//le mot-clé void signifie que la fonction ne retourne aucune valeur.
try {
const user = await this.findOneById(id);
if (!user) {
throw new NotFoundException(`Utilisateur avec l’ID ${id} non trouvé`);
}
await this.userRepository.delete(id);
} catch (error) {
console.error("Erreur lors de l’opération de suppression:", error);
throw new InternalServerErrorException('Échec de la suppression de l’utilisateur');
}
}

async activateAccount(email: string, password: string): Promise<User> {
try {
const user = await this.findOneByEmail(email);
if (user && user.password === password) {
user.active = true;
await this.userRepository.save(user);
return user;
}
throw new NotFoundException('Identifiants invalides');
} catch (error) {
console.error("Erreur lors de l’activation du compte:", error);
throw new InternalServerErrorException('Échec de l’activation du compte');
}
}

}