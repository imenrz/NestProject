import { 
  BadRequestException,
  Body, 
  Controller, 
  Delete, 
  Get, 
  Headers, 
  Injectable, 
  Param, 
  ParseIntPipe, 
  Patch, 
  Post, 
  Put, 
  Query 
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { ObjectId } from 'typeorm';
import { User } from './users.entity';
import { updateUserDto } from './dtos/update_user.dto';
@Injectable()
@Controller('users')
export class UsersController {

  constructor( private readonly USERService:UsersService){}

 @Post('/add')
 create(@Body()data){
  return this.USERService.createUser(data.email,data.password,data.role);
 }


@Get("/all")
  findall(){
    return this.USERService.findAll()
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

  @Get('role/:role')
  async getUsersByRole(@Param('role') role: string) {
    return this.USERService.findUsersByRole(role);
  }
  @Get('/inactive')
  async getInactiveUsers() {
    return this.USERService.findInactiveUsers();
  }
  @Get('domain/:domain')//tester avec http://localhost:3000/users/domain/gmail.com
  async getUsersByDomain(@Param('domain') domain: string) {
    return this.USERService.findUsersByDomain(domain);
  }

 @Get('/recent')
  async getRecentUsers() {
    return this.USERService.findRecentUsers();
  }
 @Get('/count-by-role')
  async getCountByRole() {
    return this.USERService.countUsersByRole();
  }

 @Get('/date-range')//tester avec localhost:3000/users/date-range?start=2025-12-07&end=2025-12-10
  async getUsersByDateRange(
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return this.USERService.findUsersByDateRange(startDate, endDate);
  }
  @Get('/recent-limit')//localhost:3000/users/recent-limit?limit=2
  async getRecentUsersLimit(@Query('limit', ParseIntPipe) limit: number){
    return this.USERService.findRecentUsersLimit(limit);
  }

 @Get('/average-time')
  async getAverageTimeBetweenCreateAndUpdate() {
    return this.USERService.calculateAverageTimeBetweenCreateAndUpdate();
  }
@Get('/paginated')//localhost:3000/users/paginated?page=2&limit=3
async getPaginatedUsers(
  @Query('page', ParseIntPipe) page: number,
  @Query('limit', ParseIntPipe) limit: number,
) {
  return this.USERService.findPaginatedUsers(page, limit);
}
@Get('/sorted')
  async getSortedUsers() {
    return this.USERService.findSortedUsers();
  }
@Get('/multi-sorted')
  async getUsersWithMultipleSorting() {
    return this.USERService.findUsersWithMultipleSorting();
  }
  //Partie 4 
 @Post('/doublon')
  async createDoublon(@Body() data: CreateUserDto) {
    try {
      return await this.USERService.createUserDoublon(data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
@Patch('/updateUserNonTrouve/:id')
   updateUserNonTrouve(
    @Param('id') id: ObjectId,
    @Body() attrs: updateUserDto,
  ) {
   
    return this.USERService.updateUser(id, attrs);
  }
@Patch('/deactivate-old-accounts')
   deactivateOldAccounts() {
    this.USERService.deactivateOldAccounts();
  }
 @Patch('/update-role-by-domain')
  updateUsersRoleByDomain(@Body() data ) {
    this.USERService.updateUsersRoleByDomain(data.domain, data.newRole);
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