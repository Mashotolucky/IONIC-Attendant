import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {Admin} from './models/admin.class'
import {AdminService} from './admin.service';
import { map, Observable } from 'rxjs';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Post('register')
    register(@Body() admin: Admin): Observable<Admin> {
      return this. adminService.registerAdmin(admin
        );
    }
    


  // @Post('login')
  // @HttpCode(HttpStatus.OK)
  // login(@Body() admin: Admin): Observable<{ token: string }> {
  //   return this.adminService
  //     .login(admin)
  //     .pipe(map((jwt: string) => ({ token: jwt })));
  // }

}
