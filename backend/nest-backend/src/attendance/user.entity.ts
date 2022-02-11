import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
 
@Entity()
export class Users {
  @PrimaryColumn()
  id: number;
 
  @Column()
  name: string;
 
  @Column()
  surname: string;

  @Column()
  employeenumber: number;

  @Column()
  email: string;
 
  @Column()
  password: string;
}