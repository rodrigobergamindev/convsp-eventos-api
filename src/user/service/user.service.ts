import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaService, User } from 'src/prisma/module';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService, private readonly configService: ConfigService) {}

    
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

   
}
