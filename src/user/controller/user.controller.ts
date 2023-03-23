import { Controller, Get, NotFoundException, Param, Post, UsePipes, ValidationPipe, Body, Put, Delete } from '@nestjs/common';
import { User, UserAddress } from '@prisma/client';
import { CreateUserAddressDTO } from '../dto/CreateUserAddressDTO';
import { CreateUserDTO } from '../dto/CreateUserDTO';
import { UpdateUserAddressDTO } from '../dto/UpdateUserAddressDTO';
import { UpdateUserDTO } from '../dto/UpdateUserDTO';
import { UserAddressValidationExistPipe, UserValidationAlreadyExistPipe, UserValidationExistPipe } from '../pipes/UserValidationPipe';
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

    

    /*CREATE*/

    @Post()
    @UsePipes(ValidationPipe, UserValidationAlreadyExistPipe)
        async create(
            @Body() data: CreateUserDTO): Promise<void>{

               return await this.userService.create(data)

               
        }

    

    /*UPDATE USER*/
    @Put(':id')
    @UsePipes(ValidationPipe)
    async update(
          @Param('id', UserValidationExistPipe) id: string, 
          @Body() data: UpdateUserDTO): Promise<void>{
               await this.userService.update(id, data)
        }
    
    
    /*DELETE USER*/
    @Delete(':id')
    async deleteUser(
        @Param('id', UserValidationExistPipe) id : string): Promise<void> {
          
            await this.userService.delete(id)
        }
    

     /*ADDRESS*/
    
     /*CREATE ADDRESS*/
     @Post('address/:userId')
     @UsePipes(ValidationPipe)
     async createAddress(
           @Param('userId', UserValidationExistPipe) userId: string,
           @Body() data: CreateUserAddressDTO
     ): Promise<void>{
                await this.userService.createUserAddress(userId, data)
         }
 
 
    /*UPDATE ADDRESS*/
     @Put('address/:userAddressId')
     @UsePipes(ValidationPipe)
         async updateAddress(
               @Param('userAddressId', UserAddressValidationExistPipe) userAddressId: string,
               @Body() data: UpdateUserAddressDTO 
         ): Promise<void>{
                    await this.userService.updateUserAddress(userAddressId, data)
             }
    
    /**FIND USER ADDRESS */
     @Get('address/:userAddressId')
         async findUserAddress(
             @Param('userAddressId') userAddressId: string,
         ): Promise<UserAddress> {
             
                 const userAddress = await this.userService.findUserAddress(userAddressId)
                 if(!userAddress) throw new NotFoundException({statusCode: 404, message: "User Address Not Found"})
                 return userAddress
         } 

}
