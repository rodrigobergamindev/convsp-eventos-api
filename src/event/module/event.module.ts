import { Module } from '@nestjs/common';
import { EventService } from '../service/event.service';
import { EventController } from '../controller/event.controller';
import { PrismaService } from 'src/prisma/module';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/service/user.service';

@Module({
  providers: [EventService, PrismaService, ConfigService, UserService],
  controllers: [EventController]
})
export class EventModule {}
