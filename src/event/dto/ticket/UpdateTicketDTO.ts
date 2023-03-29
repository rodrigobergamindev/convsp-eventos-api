
import {
    Prisma
  } from '@prisma/client';
import { IsNotEmpty, IsOptional} from 'class-validator'



export class UpdateTicketDTO implements Prisma.TicketUpdateInput {

    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly price: number;

    @IsNotEmpty()
    readonly quantity: number;


}