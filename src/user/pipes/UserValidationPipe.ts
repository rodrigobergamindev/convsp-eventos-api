
import { ArgumentMetadata, BadRequestException, PipeTransform, NotFoundException, Injectable } from "@nestjs/common";
import { UserService } from "../service/user.service";


@Injectable()
export class UserValidationExistPipe implements PipeTransform {

    constructor(private readonly userService: UserService){}

    async transform(value: any, metadata: ArgumentMetadata) {
    
        if(!value){
            throw new BadRequestException(`O valor do parâmetro ${metadata.data} deve ser informado`)
        }
        
        const userExist = await this.userService.findById(value)
        if(!userExist) throw new NotFoundException({statusCode: 400, message: "Usuário não encontrado"})
        
        return value

    }
    
}

@Injectable()
export class UserValidationAlreadyExistPipe implements PipeTransform {

    constructor(private readonly userService: UserService){}

    async transform(value: any, metadata: ArgumentMetadata) {
    
        if(!value){
            throw new BadRequestException(`O valor do parâmetro ${metadata.data} deve ser informado`)
        }
       
        const userExist = await this.userService.findByCPF(value.cpf)

        if(userExist) throw new BadRequestException({statusCode: 404, message: "Usuário já existe"})
            
        return value

    }
}




@Injectable()
export class UserAddressValidationExistPipe implements PipeTransform {

    constructor(private readonly userService: UserService){}

    async transform(value: any, metadata: ArgumentMetadata) {
    
        if(!value){
            throw new BadRequestException(`O valor do parâmetro ${metadata.data} deve ser informado`)
        }

        const addressExist = await this.userService.findUserAddress(value)
        if(!addressExist) throw new NotFoundException({statusCode: 400, message: "Endereço não encontrado"})
        
        return value

    }
}

