
import {
    Prisma, UserType,
  } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber} from 'class-validator'



export class UpdateUserDTO implements Prisma.UserUpdateInput {

  @IsNotEmpty()
  readonly name: string;
  
  @IsOptional()
  readonly type: UserType;
  
  @IsNotEmpty()
  readonly rg: string;

  @IsNotEmpty()
  readonly cpf: string;

  @IsNotEmpty()
  readonly birth: Date;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly address: Prisma.UserAddressUpdateOneWithoutUserNestedInput;

  @IsOptional()
  readonly subscription?: Prisma.SubscriptionCreateNestedManyWithoutUserInput;

  @IsOptional()
  readonly event?: Prisma.EventCreateNestedManyWithoutProducerInput;
  
}