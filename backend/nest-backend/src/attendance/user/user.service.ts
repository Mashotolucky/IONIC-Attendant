import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

//import user entity
import { Users } from '../user.entity';

@Injectable()
export class UserService {

    constructor(@InjectRepository(Users) private userRepo: Repository<Users>){}
    findAll(): Promise<Users[]> {
        return this.userRepo.find();
      }
}
