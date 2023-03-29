import { EventService } from './../service/event.service';
import { Controller, Get, Put, Delete, Param, NotFoundException, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { Event } from '@prisma/client';
import { UserValidationExistPipe } from 'src/user/pipes/UserValidationPipe';
import { CreateEventDTO } from '../dto/event/CreateEventDTO';
import { UpdateEventDTO } from '../dto/UpdateEventDTO';
import { EventValidationExistPipe } from '../pipes/event/EventValidationPipe';
import { UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common/decorators';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { TicketValidationAlreadyExistPipe, TicketValidationExistPipe } from '../pipes/ticket/TicketValidationPipe';

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

      /*CREATE*/

      @Post()
      @UsePipes(ValidationPipe)
          async create(
            @Param('producerId', UserValidationExistPipe) producerId: string, 
              @Body() data: CreateEventDTO): Promise<string>{
                  
                 const event = await this.eventService.create(data, producerId)
                 return event.id         
          }
  
      
  
      /*UPDATE EVENT*/
      @Put(':id')
      @UsePipes(ValidationPipe)
      async update(
            @Param('eventId', EventValidationExistPipe) eventId: string, 
            @Body() data: UpdateEventDTO): Promise<void>{
                 await this.eventService.update(data, eventId)
          }
      
      
      /*DELETE EVENT*/
      @Delete(':id')
      async deleteEvent(
          @Param('id', EventValidationExistPipe) id : string): Promise<void> {
            
              await this.eventService.delete(id)
          }


    /*IMAGE UPLOAD AND DELETE*/
    

    @Post(':id/fileUpload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @Param('id', EventValidationExistPipe) id: string,
        @UploadedFile() file: Express.Multer.File): Promise<void> {
            await this.eventService.fileUpload(id, file);

    }

    @Delete(':id/deleteFiles')
    async deleteFile(
        @Param('id', EventValidationExistPipe) id: string, 
        @Body() file: string): Promise<void> {
            await this.eventService.deleteFile(file)

    }


    /*CREATE TICKET*/

    @Post()
      @UsePipes(ValidationPipe, TicketValidationAlreadyExistPipe)
          async createTicket( 
              @Body() data: CreateEventDTO, eventId: string): Promise<void>{
                  
                 await this.eventService.createTicket(data, eventId)
                        
          }
      
}
