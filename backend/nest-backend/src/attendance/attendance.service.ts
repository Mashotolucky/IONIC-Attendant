import { Inject, Injectable } from '@nestjs/common';
import { ATTENDANCE_REPOSITORY } from '../constant';
import { AttendanceDto } from './dto/attendance.dto';
import { Attendance } from './attendance.entity';

@Injectable()
export class AttendanceService {
    constructor(@Inject(ATTENDANCE_REPOSITORY ) private readonly attendanceRepository: typeof Attendance) { }

    // async create(user:AttendanceDto): Promise<c> {
    //     return await this.attendanceRepository.create<Attendance>(user);
    // }

    async findOneById(id: number): Promise<Attendance> {
        return await this.attendanceRepository.findOne<Attendance>({ where: { id } });
    }
    async create(post: AttendanceDto, userId): Promise<Attendance> {
        return await this.attendanceRepository.create<Attendance>({ ...post, userId });
    }

    async findAll(): Promise<Attendance[]> {
        return await this.attendanceRepository.findAll<Attendance>({
        	include: [{ model:Attendance, attributes: { exclude: ['password'] } }],
    	});
    }

    async findOne(id): Promise<Attendance> {
        return await this.attendanceRepository.findOne({
        	where: { id },
        	include: [{ model: Attendance, attributes: { exclude: ['password'] } }],
    	});
    }

    async delete(id, userId) {
        return await this.attendanceRepository.destroy({ where: { id, userId } });
    }

    async update(id, data, userId) {
        const [numberOfAffectedRows, [updatedAttendance]] = await this.attendanceRepository.update({ ...data }, { where: { id, userId }, returning: true });

        return { numberOfAffectedRows, updatedAttendance };
    }

}
