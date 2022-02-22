import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ControllersController } from './controllers/controllers.controller';
import { IsCreatorGuard } from './guards/attendance.guard';
import { attendanceEntity } from './models/attendance.entity';
import { ServicesService } from './services/services.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([attendanceEntity])],
  controllers: [ControllersController],
  providers: [ServicesService,IsCreatorGuard]
})
export class AttendanceModule {}
