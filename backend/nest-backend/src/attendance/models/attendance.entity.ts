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
  
    @Column({ default: '' })
    location: string;

    @Column()
    temperature: number;

    @Column()
    covid_symptoms_status: boolean;

    @Column({ default: '' })
    creationTimestamp: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @ManyToOne(() => UserEntity, (userEntity) => userEntity.Attendence)
    author: UserEntity;
  }