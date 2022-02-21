import { IsEmail, IsString } from 'class-validator';
import { Role } from './role.enum';

export class User {
  id?: number;
  firstName?: string;
  employeeNumber?: string;
  lastName?: string;
  @IsEmail()
  email?: string;
  @IsString()
  password?: string;
  
  role?: Role;
  
}