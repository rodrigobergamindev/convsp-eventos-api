
import { ArgumentMetadata, BadRequestException, PipeTransform, NotFoundException, Injectable } from "@nestjs/common";
import { EventService } from "../../service/event.service";



@Injectable()
export class TicketValidationExistPipe implements PipeTransform {

    constructor(private readonly eventService: EventService){}

    async transform(value: any, metadata: ArgumentMetadata) {
    
        if(!value){
            throw new BadRequestException(`O valor do parâmetro ${metadata.data} deve ser informado`)
        }
       
        const tickeExist = await this.eventService.findTicketById(value)
        if(!tickeExist) throw new NotFoundException({statusCode: 400, message: "Ingresso não encontrado para este evento."})
        
        return value

    }
    
}




