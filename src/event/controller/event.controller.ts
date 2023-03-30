import { EventService } from './../service/event.service';
import { Controller, Get, Put, Delete, Param, NotFoundException, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { Event, Subscription } from '@prisma/client';
import { UserValidationExistPipe } from 'src/user/pipes/UserValidationPipe';
import { CreateEventDTO } from '../dto/event/CreateEventDTO';

import { EventValidationExistPipe } from '../pipes/event/EventValidationPipe';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { TicketValidationExistPipe } from '../pipes/ticket/TicketValidationPipe';
import { CreateTicketDTO } from '../dto/ticket/CreateTicketDTO';
import { UpdateEventDTO } from '../dto/event/UpdateEventDTO';
import { UpdateTicketDTO } from '../dto/ticket/UpdateTicketDTO';

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

      @Post(':producerId')
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
            @Param('id', EventValidationExistPipe) id: string, 
            @Body() data: UpdateEventDTO): Promise<void>{
                 await this.eventService.update(data, id)
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

    @Delete(':id/deleteFile')
    async deleteFile(
        @Param('id', EventValidationExistPipe) id: string, 
        @Body() data: any): Promise<void> {
            await this.eventService.deleteFile(data.file)

    }


    /*CREATE TICKET*/

    @Post(':eventId/ticket')
      @UsePipes(ValidationPipe)
          async createTicket( 
                @Param('eventId', EventValidationExistPipe) eventId: string,
              @Body() data: CreateTicketDTO): Promise<void>{
                  await this.eventService.createTicket(data, eventId)
                        
          }
      

    /*UPDATE TICKET*/
          @Put('ticket/:ticketId')
          @UsePipes(ValidationPipe)
          async updateTicket(
                @Param('ticketId', TicketValidationExistPipe) ticketId: string, 
                @Body() data: UpdateTicketDTO): Promise<void>{
                     await this.eventService.updateTicket(data, ticketId)
              }
          
          
    /*DELETE TICKET*/
          @Delete('ticket/:id')
          async deleteTicket(
              @Param('id', TicketValidationExistPipe) id : string): Promise<void> {
                
                  await this.eventService.deleteTicket(id)
              }
    
              
     /*CREATE SUBSCRIPTION*/
     
     @Post('subscription/:ticketId/:userId')
      @UsePipes(ValidationPipe)
          async createSubscription( 
                @Param('ticketId', TicketValidationExistPipe) ticketId: string,
                @Param('userId', UserValidationExistPipe) userId: string
             ): Promise<void>{
                
                  await this.eventService.createSubscription(ticketId, userId)
                        
             }

    
    /*FIND SUBSCRIPTION*/


    @Get()
    async getSubscriptions(): Promise<Subscription[]>{
        const subscriptions = await this.eventService.findAllSubscriptions();
        return subscriptions
    }

    @Get('id/:id')
    async getSubscriptionById(
        @Param('id') id : string): Promise<Subscription> {
            const subscription = await this.eventService.findSubscriptionById(id)
            if(!subscription) throw new NotFoundException({statusCode: 404, message: "Subscription Not Found"})
            return subscription
        }  

    
    /*CREATE PAYMENT*/

    @Post('subscription/payment')
    @UsePipes(ValidationPipe)
        async createPayment( 
            @Body() data: any
           ): Promise<void>{
                return await this.eventService.createPayment(data)
                       
           }

    @Post('subscription/payment/status')
            async paymentStatus( 
                   @Body() data: any
                  ): Promise<void>{
                       console.log(data)
                             
                  }
            }
