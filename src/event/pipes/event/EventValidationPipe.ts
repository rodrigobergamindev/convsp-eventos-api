
import { ArgumentMetadata, BadRequestException, PipeTransform, NotFoundException, Injectable } from "@nestjs/common";
import { EventService } from "../../service/event.service";



@Injectable()
export class EventValidationExistPipe implements PipeTransform {

    constructor(private readonly eventService: EventService){}

    async transform(value: any, metadata: ArgumentMetadata) {
    
        if(!value){
            throw new BadRequestException(`O valor do parâmetro ${metadata.data} deve ser informado`)
        }
        
        const eventExist = await this.eventService.findById(value)
        if(!eventExist) throw new NotFoundException({statusCode: 400, message: "Evento não encontrado"})
        
        return value

    }
    
}





