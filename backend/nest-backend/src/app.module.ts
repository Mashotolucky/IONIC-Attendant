import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './attendance/user.entity';
import { UserModule } from './attendance/user/user.module';

//typeorm module
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Letsdoit!',
      database: 'attendance',
      entities: [Users],
      
    }),
    UserModule

  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
