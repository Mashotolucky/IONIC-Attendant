import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from '../user.entity';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}
    @Get('all')
    async getAll():Promise<Users[]>{
        return await this.userService.findAll();
    }

}
