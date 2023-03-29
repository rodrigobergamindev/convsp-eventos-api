
import {
    Prisma
  } from '@prisma/client';
import { IsNotEmpty, IsOptional} from 'class-validator'



export class CreateTicketDTO implements Prisma.TicketCreateInput {

    @IsNotEmpty()
    readonly title: string;

    @IsOptional()
    readonly event: Prisma.EventCreateNestedOneWithoutTicketInput;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly price: number;

    @IsNotEmpty()
    readonly quantity: number;

    
}