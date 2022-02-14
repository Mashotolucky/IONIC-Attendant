import { Inject, Injectable } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY } from '../constant';
import { AttendanceDto } from './dto/attendance.dto';
import { Attendance } from './attendance.entity';

@Injectable()
export class AttendanceService {
    constructor(@Inject(ATTENDANCE_REPOSITORY ) private readonly attendanceRepository: typeof Attendance) { }

    async create(user:AttendanceDto): Promise<Attendance> {
        return await this.attendanceRepository.create<Attendance>(user);
    }

    async findOneById(id: number): Promise<Attendance> {
        return await this.attendanceRepository.findOne<Attendance>({ where: { id } });
    }

}
