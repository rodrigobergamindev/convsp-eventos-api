import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaService, User, UserAddress } from 'src/prisma/module';
import { CreateUserAddressDTO } from '../dto/CreateUserAddressDTO';
import { CreateUserDTO } from '../dto/CreateUserDTO';
import { UpdateUserAddressDTO } from '../dto/UpdateUserAddressDTO';
import { UpdateUserDTO } from '../dto/UpdateUserDTO';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService, private readonly configService: ConfigService) {}


    /**FIND */
    
    async findAll(): Promise<User[]>{
        const users = await this.prisma.user.findMany()
      
        return users
        }


    async findById(id: string): Promise<User> {
       
          try {
            const user = await this.prisma.user.findUnique({
              where: {
                  id
              },
              include: {
                address: true,
                events: true,
                subcription: true
              }
            })
          
            return user 
          } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError) {
              throw new HttpException(`${error.code}`, HttpStatus.NOT_FOUND)
            }
          }
      
        }

    async findByName(name: string): Promise<User[]> {
          const user = await this.prisma.user.findMany({
            where: {
              name: {
                contains: name
              }
            }
          })
        
          return user
        }

    async findByCPF(cpf: string): Promise<User> {

          try {
            const user = await this.prisma.user.findUnique({
              where: {
                cpf
              },
              include: {
                address: true,
                events: true,
                subcription: true
              }
            })
          
            return user

          } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError) {
              throw new HttpException(`${error.code}`, HttpStatus.NOT_FOUND)
            }
          }
      
          
        }

   
    /*CREATE*/

    async create(data: CreateUserDTO): Promise<void> {

        try {
          const createUser = await this.prisma.user.create({
            data: {
              ...data
            }
           })
        } catch (error) {
          if(error instanceof Prisma.PrismaClientKnownRequestError) {
              throw new HttpException(`${error.code}`, HttpStatus.BAD_REQUEST)
          }
        }
      
         
       }

      /*UPDATE*/

      async update(id: string, data: UpdateUserDTO): Promise<void> {
     
        try {
          const updateUser = await this.prisma.user.update({
            where: {
              id: id
            },
            data: {
              ...data
            }
          })
        } catch (error) {
          if(error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new HttpException(`${error.code}`, HttpStatus.BAD_REQUEST)
        }
        }
        
        
      }

      /*DELETE*/

      async delete(id: string): Promise<void> {
      
        try {
          const deleteUser = await this.prisma.user.delete({
            where: {
              id
            }
          })
  
        } catch (error) {
          if(error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new HttpException(`${error.code}`, HttpStatus.FORBIDDEN)
        }
        }
  
      }


      /*ADDRESS*/

      async createUserAddress(userId: string, data: CreateUserAddressDTO): Promise<void> {

        try {
          const createAddress = await this.prisma.userAddress.create({
            data: {
              ...data,
              user: {
                connect: {
                  id: userId
                }
              }
            }
          })
        } catch (error) {
          if(error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new HttpException(`${error.code}`, HttpStatus.BAD_REQUEST)
          }
        }
        
      }
  
      async updateUserAddress(userAddressId: string, data: UpdateUserAddressDTO): Promise<void> {
  
          try {
            const updateAddress = await this.prisma.userAddress.update({
              where: {
                id: userAddressId
              },
              data: {
                ...data
              }
            })
          } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError) {
              throw new HttpException(`${error.code}`, HttpStatus.BAD_REQUEST)
            }
          }
          
          
      }
   
      async findUserAddress(userAddressId: string): Promise<UserAddress> {
  
        try {
          const userAddress = await this.prisma.userAddress.findUnique({
            where: {
              id: userAddressId
            }
          })
    
          return userAddress
        } catch (error) {
          if(error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new HttpException(`${error.code}`, HttpStatus.NOT_FOUND)
          }
  
        }
  
        
      }

}
