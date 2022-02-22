import { attendanceEntity } from 'src/attendance/models/attendance.entity';
import {
    Column,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  
  import { Role } from '../../auth/models/role.enum';
 
  @Entity('admin')
  export class AdminEntity {
    @PrimaryGeneratedColumn()
    id: number;
    email: string;
  
    @Column({ select: false })
    password: string;

    @OneToMany(() => attendanceEntity, ( attendanceEntity) =>  attendanceEntity.author)
    Attendence: attendanceEntity[];
  
    @Column({ type: 'enum', enum: Role, default: Role.ADMIN })
    role: Role;
    user: any;
  
    
  }