import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaService, User, UserAddress } from 'src/prisma/module';
import { CreateUserDTO } from '../dto/CreateUserDTO';
import { UpdateUserDTO } from '../dto/UpdateUserDTO';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService, 
      private readonly configService: ConfigService) {}


    /**FIND */
    
    async findAll(): Promise<User[]>{
        const users = await this.prisma.user.findMany({
          include: {
            address: true,
            subcriptions: true,
            events: true
          }
        })
    
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
                subcriptions: true,
                events: true
              }
            })
          
            return user 
            
          } catch (error) {
            if(error) {
              throw new HttpException(`${error}`, HttpStatus.NOT_FOUND)
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
                subcriptions: true,
                events: true
              }
            })
          
            return user

          } catch (error) {
            if(error) {
              throw new HttpException(`${error}`, HttpStatus.NOT_FOUND)
            }
          }
      
          
        }

   
    /*CREATE*/

      async create(data: CreateUserDTO): Promise<void> {

     
        try {
    
        const createUser = await this.prisma.user.create({
          data: {
            ...data,
            address: {
              create: data.address as Prisma.UserAddressCreateWithoutUserInput
            }
            }
          })
           
        } catch (error) { 
            if(error){
              throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST)
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
              ...data,
              address: {
                update: data.address as Prisma.UserAddressUpdateWithoutUserInput
              }
            }
          })
        } catch (error) {
          if(error) {
            throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST)
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
          if(error) {
            throw new HttpException(`${error}`, HttpStatus.FORBIDDEN)
        }
        }
  
      }


      /*FIND ADDRESS*/

      async findUserAddress(id: string): Promise<UserAddress> {

        const address = await this.prisma.userAddress.findUnique({
          where: {
            id
          }
        })

        return address
      }
}
