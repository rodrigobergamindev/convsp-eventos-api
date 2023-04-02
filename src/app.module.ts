
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/module/prisma.module';
import { UserModule } from './user/module/user.module';
import { EventModule } from './event/module/event.module';
import { HttpModule } from '@nestjs/axios';





@Module({
  imports: [PrismaModule, UserModule, EventModule, HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
