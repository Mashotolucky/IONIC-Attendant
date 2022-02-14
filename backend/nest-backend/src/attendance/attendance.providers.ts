import { Attendance } from './attendance.entity';
import { ATTENDANCE_REPOSITORY } from '../constant';

export const attendanceProviders = [{
    provide: ATTENDANCE_REPOSITORY,
    useValue: Attendance,
}];