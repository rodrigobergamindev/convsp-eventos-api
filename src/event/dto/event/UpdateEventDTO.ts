
import {
    EventStatus,
    Prisma
  } from '@prisma/client';
import { IsNotEmpty, IsOptional} from 'class-validator'



export class UpdateEventDTO implements Prisma.EventUpdateInput {

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
    
    readonly producer: Prisma.UserUpdateOneRequiredWithoutEventsNestedInput;

}