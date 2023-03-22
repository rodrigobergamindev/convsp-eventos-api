import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/module/prisma.module';
import { UserModule } from './user/module/user.module';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';
import { SubscriptionModule } from './subscription/subscription.module';




@Module({
  imports: [PrismaModule, UserModule, EventModule, TicketModule, SubscriptionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
