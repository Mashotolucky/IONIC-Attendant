import { Body, Controller, Post } from '@nestjs/common';
import {Admin} from './models/admin.class'
import {AdminService} from './admin.service';
import { Observable } from 'rxjs';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Post('register')
    register(@Body() admin: Admin): Observable<Admin> {
      return this. adminService.registerAdmin(admin
        );
    }

}
