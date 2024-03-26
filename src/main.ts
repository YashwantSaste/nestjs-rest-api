import { NestFactory,HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './all-exceptions.filter';
// import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule,{
  //   bufferLogs:true
  // });
  // app.useLogger(app.get(MyLoggerService))
  //the above code is to demonstrate the use of logger module globally in the application
  const app=await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter))
  app.setGlobalPrefix('api/v1') //to set the prefix name for the endpoints such as "/api/v1/endpoints"
  app.enableCors(); // to enable cross origin resource sharing
  await app.listen(3000);
}
bootstrap();
