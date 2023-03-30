
import {
    Prisma
  } from '@prisma/client';
import { IsNotEmpty, IsOptional} from 'class-validator'



export class CreateSubscriptionDTO implements Prisma.SubscriptionCreateInput {

    @IsNotEmpty()
    readonly user: Prisma.UserCreateOrConnectWithoutSubcriptionsInput;

    @IsNotEmpty()
    readonly ticket: Prisma.TicketCreateOrConnectWithoutSubscriptionInput;

    readonly payment: Prisma.PaymentCreateNestedOneWithoutSubscriptionInput;

    readonly partner: Prisma.PartnerCreateOrConnectWithoutSubscriptionInput;

    
}