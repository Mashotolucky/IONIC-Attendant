import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  import { UserEntity } from '../../auth/models/user.entity';
import {AdminEntity} from '../../admin/models/admin.entity';
  
  @Entity('attendance')
  export class attendanceEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    location: string;

    @Column()
    temperature: string;

    @Column()
    covid_symptoms_status: string;

    @Column()
    time: string;

    @Column()
    date: string;
  
    
    
    @ManyToOne(() => UserEntity, (userEntity) => userEntity.Attendance)
    author: UserEntity;
  }