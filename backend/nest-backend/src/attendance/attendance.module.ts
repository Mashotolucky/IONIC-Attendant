import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { attendanceProviders } from './attendance.providers';

@Module({
  providers: [AttendanceService,...attendanceProviders],
  controllers: [AttendanceController]
})
export class AttendanceModule {}
