import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from '../service/user.service';

@Controller('api/user')
export class UserController {

    constructor(private readonly userService: UserService) {}


    /*FIND*/

    @Get()
        async getUsers(): Promise<User[]>{
            const users = await this.userService.findAll();
            return users
        }
    
    @Get('id/:id')
        async getUserById(
            @Param('id') id : string): Promise<User> {
                const user = await this.userService.findById(id)
                if(!user) throw new NotFoundException({statusCode: 404, message: "User Not Found"})
                return user
            }  
       
    @Get('name/:name')
        async getUserByName(
            @Param('name') name : string): Promise<User[]> {
                const user = await this.userService.findByName(name)
                return user
        }

    @Get('cpf/:cpf')
        async getUserByCpf(
            @Param('cpf') cpf : string): Promise<User> {
                const user = await this.userService.findByCPF(cpf)
                if(!user) throw new NotFoundException({statusCode: 404, message: "User Not Found"})
                return user
        }



}
