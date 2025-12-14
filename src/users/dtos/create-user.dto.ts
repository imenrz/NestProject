import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Le nom d\'utilisateur est obligatoire' })
  @IsString({ message: 'Le nom d\'utilisateur doit être une chaîne de caractères' })
  @MinLength(3, { message: 'Le nom d\'utilisateur doit contenir au moins 3 caractères' })
  username: string;

  @IsNotEmpty({ message: 'L\'email est obligatoire' })
  @IsEmail({}, { message: 'L\'email doit être une adresse valide' })
  email: string;
  
 role:string; 


}