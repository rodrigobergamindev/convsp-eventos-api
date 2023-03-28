import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/module';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';


@Module({
  providers: [UserService, PrismaService, ConfigService],
  controllers: [UserController]
})
export class UserModule {}
