import { Body, Controller, Post } from '@nestjs/common';
import { AdminDto } from './dto/admin.dto';
import { AdminService} from './admin.service'

@Controller('admin')
export class AdminController {
    constructor (private adminService:AdminService){}
    @Post('signup')
    async signUp(@Body() admin: AdminDto) {
        return await this.adminService.create(admin);
    }

}
