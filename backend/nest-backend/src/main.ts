import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // global prefix
   app.setGlobalPrefix('api/v1');
  try {
    await app.listen(3000);
    
  } catch (error) {
    console.log(error)
  }
  
}
bootstrap();
