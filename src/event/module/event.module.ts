
import { Module } from '@nestjs/common';
import { EventService } from '../service/event.service';
import { EventController } from '../controller/event.controller';
import { PrismaService } from 'src/prisma/module';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/service/user.service';

import { HttpService } from '@nestjs/axios/dist/http.service';
import { HttpModule } from '@nestjs/axios/dist/http.module';

@Module({
  imports: [HttpModule],
  providers: [EventService, PrismaService, ConfigService, UserService],
  controllers: [EventController]
})
export class EventModule {}
