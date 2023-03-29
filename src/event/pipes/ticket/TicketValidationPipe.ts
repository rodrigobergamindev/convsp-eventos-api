
import { ArgumentMetadata, BadRequestException, PipeTransform, NotFoundException, Injectable } from "@nestjs/common";
import { EventService } from "../../service/event.service";



@Injectable()
export class TicketValidationExistPipe implements PipeTransform {

    constructor(private readonly eventService: EventService){}

    async transform(value: any, metadata: ArgumentMetadata) {
    
        if(!value){
            throw new BadRequestException(`O valor do parâmetro ${metadata.data} deve ser informado`)
        }
        
        const tickeExist = await this.eventService.findById(value)
        if(!tickeExist) throw new NotFoundException({statusCode: 400, message: "Ingresso não encontrado para este evento."})
        
        return value

    }
    
}

@Injectable()
export class TicketValidationAlreadyExistPipe implements PipeTransform {

    constructor(private readonly eventService: EventService){}

    async transform(value: any, metadata: ArgumentMetadata) {
    
        if(!value){
            throw new BadRequestException(`O valor do parâmetro ${metadata.data} deve ser informado`)
        }
        
        const tickeExist = await this.eventService.findUniqueTicket(value.title, value.eventId)
        if(tickeExist) throw new NotFoundException({statusCode: 400, message: "Ingresso já existe para esse evento."})
        
        return value

    }
    
}



