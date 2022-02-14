import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards,Request } from '@nestjs/common';
import {AttendanceService} from './attendance.service';
import { AttendanceDto } from './dto/attendance.dto';
import { Attendance } from './attendance.entity'; 

@Controller('attendance')
export class AttendanceController {
    constructor (private attendanceService: AttendanceService){}
    @Get()
    async findAll() {
        // get all posts in the db
        return await this.attendanceService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Attendance> {
        // find the post with this id
        const attendance = await this.attendanceService.findOne(id);

        // if the post doesn't exit in the db, throw a 404 error
        if (!attendance) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // if post exist, return the post
        return attendance;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() attendance: AttendanceDto, @Request() req): Promise<Attendance> {
        // create a new post and return the newly created post
        return await this.attendanceService.create(attendance, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() attendance: AttendanceDto, @Request() req): Promise<Attendance> {
        // get the number of row affected and the updated post
        const { numberOfAffectedRows, updatedPost } = await this.attendanceService.update(id, attendance, req.user.id);

        // if the number of row affected is zero, 
        // it means the post doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // return the updated post
        return updatedPost;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the post with this id
        const deleted = await this.attendanceService.delete(id, req.user.id);

        // if the number of row affected is zero, 
        // then the post doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}

function AuthGuard(arg0: string): Function | import("@nestjs/common").CanActivate {
    throw new Error('Function not implemented.');
}

