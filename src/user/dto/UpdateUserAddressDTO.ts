
import {
    Prisma, User
  } from '@prisma/client';
import { IsNotEmpty, IsOptional} from 'class-validator'


export class UpdateUserAddressDTO implements Prisma.UserAddressUpdateInput {

  @IsNotEmpty()
  readonly place: string;

  @IsOptional()
  readonly complement: string;

  @IsNotEmpty()
  readonly district: string;

  @IsNotEmpty()
  readonly city: string;

  @IsNotEmpty()
  readonly state: string;

  @IsNotEmpty()
  readonly zip_code: string;

  
  readonly user: Prisma.UserUpdateOneRequiredWithoutAddressNestedInput;

}