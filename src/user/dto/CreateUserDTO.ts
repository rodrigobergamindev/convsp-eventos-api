
import {
    Prisma, Role, UserType,
  } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsUrl } from 'class-validator'



export class CreateUserDTO implements Prisma.UserCreateInput {

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly surname: string;
  
  @IsOptional()
  readonly type: UserType;

  @IsNotEmpty()
  readonly role: Role;

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
  readonly address: Prisma.UserAddressCreateNestedManyWithoutUserInput;

  @IsOptional()
  readonly subscription?: Prisma.SubscriptionCreateNestedManyWithoutUserInput;

  @IsOptional()
  readonly event?: Prisma.EventCreateNestedManyWithoutProducerInput;
  
}