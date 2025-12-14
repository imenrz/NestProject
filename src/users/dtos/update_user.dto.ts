// create-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class updateUserDto extends PartialType(CreateUserDto) {
  // @IsEmail()
  // @IsOptional()
  // email: string;

  // @IsString()
  // @IsOptional()
  // password: string;

  // @IsBoolean()
  // @IsOptional()
  // active: boolean;

  
}