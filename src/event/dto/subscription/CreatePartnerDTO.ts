
import {
    Prisma
  } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber} from 'class-validator'



export class CreatePartnerDTO implements Prisma.PartnerCreateInput {

    @IsNotEmpty()
    readonly name: string;


    @IsNotEmpty()
    readonly rg: string;

    @IsNotEmpty()
    readonly cpf: string;

    @IsNotEmpty()
    readonly birth: Date;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsPhoneNumber('BR')
    @IsNotEmpty()
    readonly phoneNumber: string;

    readonly subscription: Prisma.SubscriptionCreateNestedOneWithoutParterInput;

}