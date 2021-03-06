import { IsEmail, IsString } from 'class-validator';
import { Role } from '../../auth/models/role.enum';
import { User } from '../../auth/models/user.class';

export class Admin {
  id?: number;
  @IsString()
  fullName?: string;
  @IsString()
  employeeNumber?: string;
  @IsEmail()
  email?: string;
  @IsString()
  password?: string;
  role?: Role;
  user?: User;
  
}