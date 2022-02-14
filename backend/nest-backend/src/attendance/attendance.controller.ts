import { Body, Controller, Post } from '@nestjs/common';
import {AttendanceService} from './attendance.service';
import { AttendanceDto } from './dto/attendance.dto';

@Controller('attendance')
export class AttendanceController {
    constructor (private attendanceService: AttendanceService){}
    @Post('Attendance')
    async Attendance(@Body() attendance:AttendanceDto) {
        return await this.attendanceService.create(attendance);
    }
}

