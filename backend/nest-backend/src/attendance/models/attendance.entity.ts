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

    // added two entities first and last name

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    temperature: string;

    @Column()
    covid_symptoms_status: string;
  
    @Column()
    location: string;

    @Column()
    time: string;

    @Column()
    date: string;
  
    //@ManyToOne(() => UserEntity, (userEntity) => userEntity.Attendance)
    author: UserEntity;
  }