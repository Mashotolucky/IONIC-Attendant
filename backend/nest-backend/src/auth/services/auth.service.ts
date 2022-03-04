import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.class';
import { Admin } from '../../admin/models/admin.class';
import { AdminEntity } from 'src/admin/models/admin.entity';


@Injectable()
export class AuthService {
  constructor(
    //injecting user repo into the service
    @InjectRepository(UserEntity)
    //readonly for repo to be given values during initializing
    private readonly userRepository: Repository<UserEntity>,
     //injecting Admin repo into the service
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    //init the wrapper for a jwt api
    private jwtService: JwtService,
  ) {}

  //function to hash the users passwords
  hashPassword(password: string): Observable<any> {
    return from(bcrypt.hash(password, 12));
  }

  //function to check if the user email already exists in the repository
  //pipe allows to perform rxjs async operations
  doesUserExist(email: string): Observable<boolean> {
    return from(this.userRepository.findOne({ email })).pipe(
      //switchmap It creates a new inner observable for every value it receives from the user
      switchMap((user: User) => {
        return of(!!user);
      }),
    );
  }

  // function to register user Account
  registerAccount(user: User): Observable<User> {
    const { firstName, lastName, email, password,employeeNumber } = user;
    
    return this.doesUserExist(email).pipe(
      //tap returns the output the functiondoesUserExist
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
              this.userRepository.save({
                firstName,
                lastName,
                email,
                employeeNumber,
                password: hashedPassword,
              }),
            ).pipe(
              //emitting the user observable to remove the password and return the resulting observable
              map((user: User) => {
                delete user.password;
                return user;
              }),
            );
          }),
        );
      }),
    );
  }
 

  //funtion to validate the user when logging in
  validateUser(email: string, password: string): Observable<User> {
    return from(
      this.userRepository.findOne(
        { email },
        {
          select: ['id', 'firstName', 'lastName', 'email', 'password', 'role'],
        },
      ),
    ).pipe(
      switchMap((user: User) => {
        if (!user) {
          throw new HttpException(
            { status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials' },
            HttpStatus.FORBIDDEN,
          );
        }
        return from(bcrypt.compare(password, user.password)).pipe(
          map((isValidPassword: boolean) => {
            if (isValidPassword) {
              delete user.password;
              return user;
            }
          }),
        );
      }),
    );
  }

   //funtion to validate the Admin user when logging in
  validateAdmin(email: string, password: string): Observable<Admin> {
    return from(
      this.adminRepository.findOne(
        { email },
        {
          select: ['id','email', 'password'],
        },
      ),
    ).pipe(
      switchMap((admin: Admin) => {
        if (!admin) {
          throw new HttpException(
            { status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials' },
            HttpStatus.FORBIDDEN,
          );
        }
        return from(bcrypt.compare(password, admin.password)).pipe(
          map((isValidPassword: boolean) => {
            if (isValidPassword) {
              delete admin.password;
              return admin;
            }
          }),
        );
      }),
    );
  }

  login(user: User): Observable<string> {
    const { email, password } = user;
    return this.validateUser(email, password).pipe(
      switchMap((user: User) => {
        if (user) {
          // create JWT - credentials
          return from(this.jwtService.signAsync({ user }));
        }
      }),
    );
  }

    loginAdmin(admin: Admin): Observable<string> {
        const { email, password } = admin;
        return this.validateAdmin(email, password).pipe(
          switchMap((admin: Admin) => {
            if (admin) {
              // create JWT - credentials
              return from(this.jwtService.signAsync({ admin }));
            }
          }),
        );
      }

  getJwtUser(jwt: string): Observable<User | null> {
    return from(this.jwtService.verifyAsync(jwt)).pipe(
      map(({ user }: { user: User }) => {
        return user;
      }),
      catchError(() => {
        return of(null);
      }),
    );
  }
}