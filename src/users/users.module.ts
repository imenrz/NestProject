import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { AdminUserController } from './admin-user-controller'; 
import { ClientUserController } from './client_user-controller'; 

@Module({
  imports:[TypeOrmModule.forFeature([User])],
   controllers: [UsersController, AdminUserController,ClientUserController],
  providers:[UsersService]

})
export class UsersModule {}

