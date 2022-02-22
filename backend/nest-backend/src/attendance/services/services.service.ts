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

  createAttendance(user: User, attendance: Attendance): Observable<Attendance> {
    attendance.author = user;
    return from(this.attendanceRepository.save(attendance));
  }

  findAllPosts(): Observable<Attendance[]> {
    return from(this.attendanceRepository.find());
  }


  findPosts(take: number = 10, skip: number = 0): Observable<Attendance[]> {
    return from(
      this.attendanceRepository
        .createQueryBuilder('post')
        .innerJoinAndSelect('post.author', 'author')
        .orderBy('post.createdAt', 'DESC')
        .take(take)
        .skip(skip)
        .getMany(),
    );
  }

  updatePost(id: number, attendance: Attendance): Observable<UpdateResult> {
    return from(this.attendanceRepository.update(id, attendance));
  }

  deletePost(id: number): Observable<DeleteResult> {
    return from(this.attendanceRepository.delete(id));
  }

  findPostById(id: number): Observable<Attendance> {
    return from(
      this.attendanceRepository.findOne({ id }, { relations: ['author'] }),
    );
  }
}