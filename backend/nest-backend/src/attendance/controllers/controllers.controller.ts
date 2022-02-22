import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Request,
    Res,
    UseGuards,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { DeleteResult, UpdateResult } from 'typeorm';
  
  import { JwtGuard } from '../../auth/guards/jwt.guard';
  
  import { Attendance } from '../models/attendance.interface';
  import { ServicesService } from '../services/services.service';
  
  import { IsCreatorGuard } from '../guards/attendance.guard';
@Controller('attendance')
export class ControllersController {
    constructor(private attendanceService: ServicesService) {}
  
    // @Roles(Role.ADMIN, Role.PREMIUM)
    // @UseGuards(JwtGuard, RolesGuard)
    @UseGuards(JwtGuard)
    @Post()
    create(@Body() attendance: Attendance, @Request() req): Observable<Attendance> {
      return this.attendanceService.createPost(req.user, attendance);
    }
  
    // @Get()
    // findAll(): Observable<FeedPost[]> {
    //   return this.feedService.findAllPosts();
    // }
  
    @UseGuards(JwtGuard)
    @Get()
    findSelected(
      @Query('take') take: number = 1,
      @Query('skip') skip: number = 1,
    ): Observable<Attendance[]> {
      take = take > 20 ? 20 : take;
      return this.attendanceService.findPosts(take, skip);
    }
  
    @UseGuards(JwtGuard, IsCreatorGuard)
    @Put(':id')
    update(
      @Param('id') id: number,
      @Body() attendance: Attendance,
    ): Observable<UpdateResult> {
      return this.attendanceService.updatePost(id, attendance);
    }
  
    @UseGuards(JwtGuard, IsCreatorGuard)
    @Delete(':id')
    delete(@Param('id') id: number): Observable<DeleteResult> {
      return this.attendanceService.deletePost(id);
    }
  
  
}

  