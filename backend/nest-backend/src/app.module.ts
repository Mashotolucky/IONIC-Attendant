import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database module/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AdminModule } from './admin/admin.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    AttendanceModule,
    AdminModule,

  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
