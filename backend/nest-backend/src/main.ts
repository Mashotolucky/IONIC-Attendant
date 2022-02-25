import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  //run the app module 
  const app = await NestFactory.create(AppModule);
   // Cross-origin resource sharing (CORS) 
   //allows resources to be requested from another domain
  app.enableCors();
   // global prefix for the url
  app.setGlobalPrefix('api');
  
  try {
    // binding and listening to the connections on the port
    await app.listen(process.env.PORT);
    console.log("server running in port " + process.env.PORT);
  } catch (error) {
    console.log(error)
  }
  
}
bootstrap();
