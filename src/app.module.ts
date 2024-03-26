import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';
@Module({
  imports: [DatabaseModule, EmployeesModule,ThrottlerModule.forRoot([{
    name:'short',
    ttl:1000, //time to live,
    limit:3 //3 request per minute
  },
  {
    name:'long',
    ttl:60000, //time to live,
    limit:100 //3 request per minute
  }
]), MyLoggerModule],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_GUARD,
    useClass:ThrottlerGuard
  }],
})
export class AppModule {}
