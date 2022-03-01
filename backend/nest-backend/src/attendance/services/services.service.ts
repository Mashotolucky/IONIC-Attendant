import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of, switchMap } from 'rxjs';
import { createQueryBuilder, DeleteResult, Repository, UpdateResult } from 'typeorm';

import { User } from '../../auth/models/user.class';
import { attendanceEntity } from '../models/attendance.entity';
import { Attendance } from '../models/attendance.interface';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(attendanceEntity)
    private readonly attendanceRepository: Repository<attendanceEntity>,
  ) {}

  // createAttendance(user: User, attendance: any): Observable<Attendance> {
  //   attendance.author = user;
  //   console.log(attendance.location);
    
  //   return from(this.attendanceRepository.save(attendance));
  // }

  create(attendance:any): Observable<Attendance>{
    return from(this.attendanceRepository.save(attendance));

  }

  findAllAttendance(): Observable<Attendance[]> {
    return from(this.attendanceRepository.find());
  }
    //Function to check if phone ID exist
  doesPhoneIDExist(phoneID: string): Observable<boolean> {
    return from(this.attendanceRepository.findOne({ phoneID})).pipe(
      switchMap((attendance: Attendance) => {
        return of(!!attendance);
      }),
    );
  }





  // findAttendance(take: number = 10, skip: number = 0): Observable<Attendance[]> {
  //   return from(
  //     this.attendanceRepository
  //       .createQueryBuilder('attendance')
  //       .innerJoinAndSelect('attendance.author', 'author')
  //       .orderBy('attendance.date', 'DESC')
  //       .take(take)
  //       .skip(skip)
  //       .getMany(),
  //   );
  // }

  // updateAttendance(id: number, attendance: Attendance): Observable<UpdateResult> {
  //   return from(this.attendanceRepository.update(id, attendance));
  // }

  // deleteAttendance(id: number): Observable<DeleteResult> {
  //   return from(this.attendanceRepository.delete(id));
  // }

  // findAttendanceById(id:any): Observable<Attendance[]> {
    
  //   return from(
  //     this.attendanceRepository.find({
  //       where: {
  //         employeeNumber:{id}
  //       }
  //       // relations: ["author"],
  //   })
  //     // ({ author }, { relations: ['author'] }),
      
  //   );
  // }
  // findAttendanceByuserId(): Observable<Attendance> {
    
  //   return from(
  //     createQueryBuilder().select("attendance").from(attendance,"firstName").getOne()
  //   );
  // }
  getMany(employeenumber:any): Promise<Attendance[]> {
    return this.attendanceRepository.createQueryBuilder('user')
      .where({employeeNumber:employeenumber }).getRawMany()
      
  }
}