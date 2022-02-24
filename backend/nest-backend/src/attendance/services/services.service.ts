import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { User } from '../../auth/models/user.class';
import { attendanceEntity } from '../models/attendance.entity';
import { Attendance } from '../models/attendance.interface';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(attendanceEntity)
    private readonly attendanceRepository: Repository<attendanceEntity>,
  ) {}

  createAttendance(user: User, attendance: any): Observable<Attendance> {
    attendance.author = user;
    console.log(attendance.location);
    
    return from(this.attendanceRepository.save(attendance));
  }

  findAllAttendance(): Observable<Attendance[]> {
    return from(this.attendanceRepository.find());
  }


  findAttendance(take: number = 10, skip: number = 0): Observable<Attendance[]> {
    return from(
      this.attendanceRepository
        .createQueryBuilder('attendance')
        .innerJoinAndSelect('attendance.author', 'author')
        .orderBy('attendance.date', 'DESC')
        .take(take)
        .skip(skip)
        .getMany(),
    );
  }

  updateAttendance(id: number, attendance: Attendance): Observable<UpdateResult> {
    return from(this.attendanceRepository.update(id, attendance));
  }

  deleteAttendance(id: number): Observable<DeleteResult> {
    return from(this.attendanceRepository.delete(id));
  }

  findAttendanceById(id: number): Observable<Attendance> {
    
    return from(
      this.attendanceRepository.findOne({ id }, { relations: ['author'] }),
      
    );
  }
  findAttendanceByuserId(): Observable<Attendance> {
    
    return from(
      this.attendanceRepository.createQueryBuilder('attendance').select('id').getOne()
      
    );
  }
}