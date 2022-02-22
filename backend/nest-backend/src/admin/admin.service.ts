
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { AdminEntity } from './models/admin.entity';
import {Admin} from './models/admin.class'

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private readonly adminRepository: Repository<AdminEntity>,
      ) {}

      doesUserExist(email: string): Observable<boolean> {
        return from(this.adminRepository.findOne({ email })).pipe(
          switchMap((admin: Admin) => {
            return of(!!admin);
          }),
        );
      }
      hashPassword(password: string): Observable<any> {
        return from(bcrypt.hash(password, 12));
      }

    registerAdmin(admin: Admin): Observable<Admin> {
        const { email, password} = admin;
    
        return this.doesUserExist(email).pipe(
          tap((doesUserExist: boolean) => {
            if (doesUserExist)
              throw new HttpException(
                'A user has already been created with this email address',
                HttpStatus.BAD_REQUEST,
              );
          }),

          
          
          switchMap(() => {
            return this.hashPassword(password).pipe(
              switchMap((hashedPassword: string) => {
                return from(
                  this.adminRepository.save({
                    
                    email,
                
                    password: hashedPassword,
                  }),
                ).pipe(
                  map((admin: Admin) => {
                    delete admin.password;
                    return admin;
                  }),
                );
              }),
            );
          }),
        );
      }
}
