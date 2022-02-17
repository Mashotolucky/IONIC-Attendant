import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import {adminProviders} from './admin.providers';

@Module({
  controllers: [AdminController],
  providers: [AdminService,...adminProviders]
})
export class AdminModule {}
