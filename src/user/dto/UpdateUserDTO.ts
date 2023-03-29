
import {
    Prisma, UserRole, UserType,
  } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber} from 'class-validator'



export class UpdateUserDTO implements Prisma.UserUpdateInput {

  @IsNotEmpty()
  readonly name: string;
  
  @IsNotEmpty()
  readonly type: UserType;

  @IsNotEmpty()
  readonly role: UserRole;
  
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

  
}