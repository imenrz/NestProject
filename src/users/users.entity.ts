import { Entity, ObjectIdColumn, ObjectId, Column, BeforeInsert, AfterUpdate, AfterInsert, BeforeRemove, AfterLoad } from 'typeorm';
import { IsString, IsEmail, IsBoolean, IsDate } from "class-validator";
import { Logger } from '@nestjs/common';

@Entity()
export class User {
   
    
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column({ default: false })
  @IsBoolean()
  active: boolean;

  @Column()
  @IsString()
  role: string; 

  @Column()
  @IsDate()
  createdAt: Date;  // Fixed: was 'creadtedAt'

  @Column()
  @IsDate()
  updatedAt: Date;

  @BeforeInsert()
  logInsert() {
    Logger.log('Creating User entity instance', 'UserEntity');
  }

  @AfterInsert()
  logAfterInsert() {
    Logger.log('User entity instance created', 'UserEntity');
  }

  @AfterUpdate()
  logAfterUpdate() {
    Logger.log('User entity instance updated', 'UserEntity');
  }

  @BeforeRemove()
  logBeforeRemove() {
    Logger.log(`Suppression de l'utilisateur avec l'id : ${this.id}`, 'UserEntity');
  }

  @AfterLoad()
  logAfterLoad() {
    Logger.log(`Utilisateur récupéré : ${this.id}`, 'UserEntity');
  }
}