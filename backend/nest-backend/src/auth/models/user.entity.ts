import {
    Column,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  
  import { Role } from './role.enum';
 
  @Entity('user')
  export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column({ select: false })
    password: string;
    @Column({ unique: true })
    employeeNumber: string;
  
  
    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;
  
    
  }