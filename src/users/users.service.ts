import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'typeorm';

import { User } from './users.entity';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update_user.dto'; 

@Injectable()
export class UsersService {

constructor(@InjectRepository(User) private userRepository:MongoRepository<User>){}



async createUser(email:string,password:string,role:string):Promise<User>{
    try{
        const now = new Date();

    
    const user= this.userRepository.create({email,password,role,createdAt:now,updatedAt:now,active:true});
    await this.userRepository.save(user);
    return user;
    }
    catch(error){
          console.error(error);
        throw new InternalServerErrorException("Erreur");
    }


}

async findAll():Promise<User[]>{
    try{
    const users=await this.userRepository.find();
    if (users.length===0){
        throw new NotFoundException("Aucun utilisateur trouvé")
    }
    return users
    }
    catch(error){
  console.error(error);
        throw new InternalServerErrorException("Erreur");
    }
}
async findOneById(id:ObjectId):Promise<User>{

    try{
        const user=await this.userRepository.findOneBy(id);
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

async findUsersByRole(role: string) {
return await this.userRepository.find({
select: role === 'admin' ? ['id', 'email', 'role', 'createdAt',
'updatedAt'] : ['id', 'email']
});
}

async findInactiveUsers() {
const sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
return await this.userRepository.find({
where: { updatedAt: { $lt: sixMonthsAgo } }
});
}


async findUsersByDomain(domain: string) {
return await this.userRepository.find({ where: { email: { $regex:
`@${domain}$` } } });
}

async findRecentUsers() {
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
return await this.userRepository.find({ where: { createdAt: { $gte:
sevenDaysAgo } } });
}

async countUsersByRole() {
return await this.userRepository.aggregate([
{ $group: { _id: "$role", count: { $sum: 1 } } }
]).toArray();
}

async findUsersByDateRange(startDate: Date, endDate: Date) {
return await this.userRepository.find({ where: { createdAt: { $gte:
startDate, $lte: endDate } } });
}

async findRecentUsersLimit(limit: number): Promise<User[]> {
return await this.userRepository.find({
order: { createdAt: 'DESC' },
take: limit,
});
}

async calculateAverageTimeBetweenCreateAndUpdate(): Promise<any> {
const result = await this.userRepository.aggregate([
{
$project: {
timeDiffInDays: {
$divide: [
{ $subtract: ['$updatedAt', '$createdAt'] },
1000 * 60 * 60 * 24,],},},},
{ $group: { _id: null, averageDays: { $avg: '$timeDiffInDays' } } },
]).toArray();
return result[0]['averageDays'] || 0;
}

async findPaginatedUsers(page: number, limit: number) {
return await this.userRepository.find({
skip: (page - 1) * limit,
take: limit });
}

async findSortedUsers() {
return await this.userRepository.find({ order: { createdAt:
'DESC' } });
}
async findUsersWithMultipleSorting(): Promise<User[]> {
return await this.userRepository.find({
order: { role: 'ASC', createdAt: 'DESC' },
});
}

//Partie 4 
async createUserDoublon(userDto: CreateUserDto) {
const existingUser = await this.userRepository.findOne({ where:
{ email: userDto.email } });
if (existingUser) {
throw new Error('Un utilisateur avec cet email existe déjà.');
}
const user = this.userRepository.create(userDto);
return await this.userRepository.save(user);
}


async updateUser(idUser: ObjectId, attrs: Partial<User>): Promise<User> {
  const existingUser = await this.findOneById(idUser);
  if (!existingUser) {
    throw new Error('Utilisateur non trouvé');
  }

  const updatedUser = { ...existingUser, ...attrs, updatedAt: new Date() };

  await this.userRepository.update(idUser, updatedUser);

  console.log(`Utilisateur ${idUser} mis à jour :`, attrs);
  return this.findOneById(idUser);
}

async deactivateOldAccounts(): Promise<void> {
const oneYearAgo = new Date();
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
await this.userRepository.updateMany(
{ updatedAt: { $lte: oneYearAgo } },
{ $set: { active: false } }
);
}

async updateUsersRoleByDomain(domain: string, newRole: string) {
return await this.userRepository.updateMany(
{ email: { $regex: `@${domain}$` } },
{ $set: { role: newRole } }
); }

}