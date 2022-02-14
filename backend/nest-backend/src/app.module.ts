import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


//typeorm module
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [

  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
