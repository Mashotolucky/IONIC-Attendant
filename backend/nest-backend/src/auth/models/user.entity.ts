import { attendanceEntity } from 'src/attendance/models/attendance.entity';
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
    employeeNumber: string;
  
    @Column()
    lastName: string;
    @Column({ unique: true })
    email: string;
  
    @Column({ select: false })
    password: string;
    

    @OneToMany(() => attendanceEntity, ( attendanceEntity) =>  attendanceEntity.author)
    Attendence: attendanceEntity[];
  
    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;
  
    
  }