import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // global prefix
  app.enableCors();
  app.setGlobalPrefix('api');
  
  try {
    await app.listen(4300);
    
  } catch (error) {
    console.log(error)
  }
  
}
bootstrap();
