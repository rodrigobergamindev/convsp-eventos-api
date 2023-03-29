
import {
    EventStatus,
    Prisma, UserType,
  } from '@prisma/client';
import { IsNotEmpty, IsOptional} from 'class-validator'



export class CreateEventDTO implements Prisma.EventCreateInput {

    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly status: EventStatus;

    @IsNotEmpty()
    readonly openingDate: Date;

    @IsNotEmpty()
    readonly openingHour: string;

    @IsNotEmpty()
    readonly endingDate: Date;

    @IsNotEmpty()
    readonly endingHour: string;

    @IsNotEmpty()
    readonly address: Prisma.EventAddressCreateNestedOneWithoutEventInput;

    @IsNotEmpty()
    readonly description: string;

    @IsOptional()
    readonly image: Prisma.EventImageCreateNestedOneWithoutEventInput;

    @IsOptional()
    readonly ticket: Prisma.TicketCreateNestedManyWithoutEventInput;

    @IsNotEmpty()
    readonly producer: Prisma.UserCreateOrConnectWithoutEventsInput;

}