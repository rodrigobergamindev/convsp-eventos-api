import { EventService } from './../service/event.service';
import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { Event } from '@prisma/client';

@Controller('api/events')
export class EventController {

    constructor(private readonly eventService: EventService) {}

    @Get()
    async getEvents(): Promise<Event[]>{
        const events = await this.eventService.findAll();
        return events
    }

    @Get('id/:id')
    async getUserById(
        @Param('id') id : string): Promise<Event> {
            const event = await this.eventService.findById(id)
            if(!event) throw new NotFoundException({statusCode: 404, message: "Event Not Found"})
            return event
        }  
   
    @Get('name/:name')
    async getUserByName(
        @Param('name') name : string): Promise<Event[]> {
            const event = await this.eventService.findByName(name)
            return event
    }
}
