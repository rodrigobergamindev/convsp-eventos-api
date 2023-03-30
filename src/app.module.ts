import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/module/prisma.module';
import { UserModule } from './user/module/user.module';
import { EventModule } from './event/module/event.module';





@Module({
  imports: [PrismaModule, UserModule, EventModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
