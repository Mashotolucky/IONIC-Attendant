import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  import { UserEntity } from '../../auth/models/user.entity';
  
  @Entity('attendance')
  export class attendanceEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    location: string;

    @Column()
    temperature: number;

    @Column()
    covid_symptoms_status: boolean;

    @Column()
    time: string;

    @Column()
    date: string;
  
    
  
    @ManyToOne(() => UserEntity, (userEntity) => userEntity.Attendence)
    author: UserEntity;
  }