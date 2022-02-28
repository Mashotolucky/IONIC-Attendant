import { attendanceEntity } from 'src/attendance/models/attendance.entity';
import {AdminEntity} from '../../admin/models/admin.entity'
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
    

    // @OneToMany(() => AdminEntity, ( AdminEntity) =>  AdminEntity.user)
    // admin: AdminEntity[];

    // @OneToMany(() => attendanceEntity, ( attendanceEntity) =>  attendanceEntity.author)
    // Attendance: attendanceEntity[];
  
    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;
  
    
  }