import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../../auth/models/user.class';

import { UserService } from '../../auth/services/user.service';
import { Attendance } from '../models/attendance.interface';
import { ServicesService} from '../services/services.service';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private attendanceService: ServicesService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params }: { user: User; params: { id: number } } = request;

    if (!user || !params) return false;

    if (user.role === 'admin') return true; // allow admins to get make requests

    const userId = user.id;
    const attendanceID = params.id;

    // Determine if logged-in user is the same as the user that created the feed post
    // return this.userService.findUserById(userId).pipe(
    //   switchMap((user: User) =>
    //     this.attendanceService.findAttendanceById(attendanceID).pipe(
    //       map((attendance: Attendance) => {
    //         let isAuthor = user.id === attendance.author.id;
    //         return isAuthor;
    //       }),
    //     ),
    //   ),
    // );
  }
}