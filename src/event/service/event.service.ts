import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Event, Prisma, PrismaService } from 'src/prisma/module';
import { CreateEventDTO } from '../dto/CreateEventDTO';
import { UpdateEventDTO } from '../dto/UpdateEventDTO';

@Injectable()
export class EventService {
    constructor(private readonly prisma: PrismaService, 
        private readonly configService: ConfigService) {}


    /**FIND */
    
    async findAll(): Promise<Event[]>{
        const events = await this.prisma.event.findMany()
    
        return events
        }


    async findById(id: string): Promise<Event> {
       
          try {
            const event = await this.prisma.event.findUnique({
              where: {
                  id
              },
              include: {
                address: true,
                ticket: true,
                image: true,
                producer: true
              }
            })
          
            return event
            
          } catch (error) {
            if(error) {
              throw new HttpException(`${error}`, HttpStatus.NOT_FOUND)
            }
          }
      
        }

    async findByName(title: string): Promise<Event[]> {
          const event = await this.prisma.event.findMany({
            where: {
              title: {
                contains: title
              }
            }
          })
        
          return event
        }



    /*CREATE*/

    async create(data: CreateEventDTO, producerId: string): Promise<void> {

     
      try {
  
      const createEvent = await this.prisma.event.create({
        data: {
          ...data,
          address: {
            create: data.address as Prisma.EventAddressCreateWithoutEventInput
          },
          producer: {
            connect: {
              id: producerId
            }
          },
          ticket: {
            create: data.ticket as Prisma.TicketCreateWithoutEventInput
          }
          }
        })
         
      } catch (error) { 
          if(error){
            throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST)
          }
        
      }
    
        
     }

     async update(data: UpdateEventDTO, eventId: string, producerId: string): Promise<void> {

     
      try {
  
      const updateEvent = await this.prisma.event.update({
        where: {
          id: eventId
        },
        data: {
          ...data,
          address: {
            create: data.address as Prisma.EventAddressCreateWithoutEventInput
          },
          producer: {
            connect: {
              id: producerId
            }
          },
          ticket: {
            update: data.ticket as Prisma.TicketUpdateWithoutEventInput 
          }
          }
        })
         
      } catch (error) { 
          if(error){
            throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST)
          }
        
      }
    
        
     }
}
