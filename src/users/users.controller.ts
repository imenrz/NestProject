import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Headers, 
  Injectable, 
  Param, 
  Post, 
  Put, 
  Query 
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './users.service';
import { ObjectId } from 'typeorm';
import { User } from './users.entity';
@Injectable()
@Controller('users')
export class UsersController {

  constructor( private readonly USERService:UserService){}

 @Post('/add')
 create(@Body()data){
  return this.USERService.create(data.email,data.password);
 }


@Get("/all")
  findall(){
    return this.USERService.findALL()
  }


@Get('/:id')
async findOne(@Param('id') id: ObjectId):Promise<User> {
  return await this.USERService.findOneById(id); 
}

  users = [
    { id: 1, username: 'Mohamed', email: 'mohamed@esprit.tn', status: 'active' },
    { id: 2, username: 'Sarra', email: 'sarra@esprit.tn', status: 'inactive' },
    { id: 3, username: 'Ali', email: 'ali@esprit.tn', status: 'inactive' },
    { id: 4, username: 'Eya', email: 'eya@esprit.tn', status: 'active' },
  ];

  
  @Get()
  getAllUsers(@Query('status') status?: string) {
    if (status) {
      return this.users.filter(user => user.status === status);
    }
    return this.users;
  }

  
  @Get('active/:status')
  getUsersByActiveStatus(@Param('status') status: string) {
    return this.users.filter(user => user.status === status);
  }

 
  @Get(':id')
  getUserById(@Param('id') id: string) {
    const user = this.users.find(user => user.id === Number(id));
    if (!user) {
      return { message: 'Utilisateur non trouvé' };
    }
    return user;
  }

  @Post()
  createUser(
    @Body() createUserDto: CreateUserDto,
    @Headers('authorization') authorization?: string
  ) {
    console.log('Authorization Header:', authorization);
    
    const newUser = {
      id: this.users.length + 1,
      username: createUserDto.username,
      email: createUserDto.email,
      status: 'active'
    };
    
    this.users.push(newUser);
    return {
      message: 'Utilisateur créé avec succès',
      user: newUser
    };
  }

  @Get('/active')
findByActive() {
 return this.USERService.findActive();
 }

  

@Delete('/delete/:id')
  remove(@Param('id') id: ObjectId) {
   
    this.USERService.remove(id);
    return { message: 'Utilisateur supprimé avec succès' };
  }
@Post('/activate')
  activateAccount(@Body() data){
      return this.USERService.activateAccount(data.email, data.password);

  }

  /*
  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto
  ) {
    const userIndex = this.users.findIndex(user => user.id === Number(id));
    
    if (userIndex === -1) {
      return { message: 'Utilisateur non trouvé' };
    }
    
    this.users[userIndex] = {
      ...this.users[userIndex],
      username: createUserDto.username,
      email: createUserDto.email
    };
    
    return {
      message: 'Utilisateur mis à jour avec succès',
      user: this.users[userIndex]
    };
  }


  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const userIndex = this.users.findIndex(user => user.id === Number(id));
    
    if (userIndex === -1) {
      return { message: 'Utilisateur non trouvé' };
    }
    
    const deletedUser = this.users.splice(userIndex, 1);
    return {
      message: 'Utilisateur supprimé avec succès',
      user: deletedUser[0]
    };
  }*/
}