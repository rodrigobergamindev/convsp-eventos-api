import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Event, EventAddress, Prisma, PrismaService, Subscription, Ticket } from 'src/prisma/module';
import { CreateEventDTO } from '../dto/event/CreateEventDTO';

import {v4 as uuid} from 'uuid'
import { S3 } from "aws-sdk";
import { UpdateEventDTO } from '../dto/event/UpdateEventDTO';
import { CreateTicketDTO } from '../dto/ticket/CreateTicketDTO';
import { UpdateTicketDTO } from '../dto/ticket/UpdateTicketDTO';
import { CreateSubscriptionDTO } from '../dto/subscription/CreateSubscriptionDTO';
import { CreatePartnerDTO } from '../dto/subscription/CreatePartnerDTO';
import {payment as pay,configurations, preferences, customers, configure, card_token, card} from 'mercadopago'
import { HttpService } from '@nestjs/axios/dist';

const mercadopagoConfig = configure({
  access_token: process.env.MERCADOPAGO_ACCESS_KEY
})

@Injectable()
export class EventService {
    constructor(private readonly prisma: PrismaService, 
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
        ) {}


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

    async create(data: CreateEventDTO, producerId: string): Promise<Event> {

      try {
  
      const event = await this.prisma.event.create({
        data: {
          ...data,
          address: {
            create: data.address as Prisma.EventAddressCreateWithoutEventInput
          },
          producer: {
            connect: {
              id: producerId
            }
          }
          }
        })
         
        return event

      } catch (error) { 
          if(error){
            throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST)
          }
        
      }
    
        
     }


     /*UPDATE*/
     async update(data: UpdateEventDTO, id: string): Promise<void> {

      try {
  
      const updateEvent = await this.prisma.event.update({
        where: {
          id
        },
        data: {
          ...data,
          address: {
            update: data.address as Prisma.EventAddressUpdateWithoutEventInput
          }
          }
        })
         
      } catch (error) { 
          if(error){
            throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST)
          }
        
      }
    
        
     }

       /*DELETE*/

       async delete(id: string): Promise<void> {
      
        try {
          const deleteEvent = await this.prisma.event.delete({
            where: {
              id
            }
          })
   
        } catch (error) {
          if(error) {
            throw new HttpException(`${error}`, HttpStatus.FORBIDDEN)
        }
        }
  
      }


      /*FIND ADDRESS*/

      async findEventAddress(id: string): Promise<EventAddress> {

        const address = await this.prisma.eventAddress.findUnique({
          where: {
            id
          }
        })

        return address
      }


      /*UPLOAD AND DELETE FILES*/

      async fileUpload(eventId: string, file: Express.Multer.File): Promise<void>{

        try {
          
            const s3 = new S3()
    
            if(file.mimetype.includes('jpeg') 
            || file.mimetype.includes('png') 
            || file.mimetype.includes('jpg')){
              
              const uploadResult = await s3.upload({
                Bucket: this.configService.get('AWS_BUCKET_NAME'), 
                Body: file.buffer,
                Key: `${uuid()}-${file.originalname}`
              }).promise()
              
              
              
              if(uploadResult.Location){
                await this.prisma.eventImage.create({
                  data: {
                    key: uploadResult.Key,
                    url: uploadResult.Location,
                    event: {
                      connect: {
                        id: eventId
                      }
                    }
                  }
                })
              }
              
             }
             
           
        } catch (error) {
          if(error) {
            throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST)
          }
  
        }
      }
  
      async deleteFile(file: string): Promise<void> {
  
        try {
        
            const s3 = new S3()
    
            const deleteResult = await s3.deleteObject({
              Bucket:this.configService.get('AWS_BUCKET_NAME'),
              Key: file
            }).promise()
    
            if(deleteResult) {
              
              const deleteFile = await this.prisma.eventImage.delete({
                where: {
                  key: file
                }
              })
            }
            
        } catch (error) {
  
          if(error) {
            throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST)
          }
        }
  
        
      }


      /*TICKET*/

      /*FIND TICKET*/

      async findAllTickets(): Promise<Ticket[]>{
        const tickets = await this.prisma.ticket.findMany()
    
        return tickets
        }


      async findTicketById(id: string): Promise<Ticket> {
       
          try {
            const ticket = await this.prisma.ticket.findUnique({
              where: {
                  id
              },
              include: {
                event: true,
                subscription: true
              }
            })
          
            return ticket
            
          } catch (error) {
            if(error) {
              throw new HttpException(`${error}`, HttpStatus.NOT_FOUND)
            }
          }
      
        }

      async findUniqueTicket(title: string, eventId: string): Promise<Ticket> {
        try {
          const ticket = await this.prisma.ticket.findUnique({
            where: {
                eventId_title: {
                  eventId,
                  title
                }
            },
            include: {
              event: true,
              subscription: true
            }
          })
        
          return ticket
          
        } catch (error) {
          if(error) {
            throw new HttpException(`${error}`, HttpStatus.NOT_FOUND)
          }
        }
      }


      /*CREATE TICKET*/

      async createTicket(data: CreateTicketDTO, eventId: string): Promise<void> {

        try {
    
        const ticket = await this.prisma.ticket.create({
          data: {
            ...data,
            event: {
              connect: {
                id: eventId
              }
            }
            }
          })
  
        } catch (error) { 
            if(error){
              throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST)
            }
          
        }
      
          
       }

       /*UPDATE TICKET*/

       async updateTicket(data: UpdateTicketDTO, 
        ticketId: string): Promise<void> {

        try {
    
        const ticket = await this.prisma.ticket.update({
          where: {
            id: ticketId
          }
          ,
          data: {
            ...data
            }
          })
           
         
  
        } catch (error) { 
            if(error){
              throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST)
            }
          
        }
      
          
       }


       /*DELETE TICKET*/
       async deleteTicket( 
        ticketId: string): Promise<void> {

        try {
    
        const deleteTicket = await this.prisma.ticket.delete({
          where: {
            id: ticketId
          }
          })
           
  
        } catch (error) { 
            if(error){
              throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST)
            }
          
        }
      
          
       }


       /*SUBSCRIPTION*/


       /*CREATE SUBSCRIPTION*/

       async createSubscription(ticketId: string, userId:string): Promise<void> {

        try {
    
        const subscription = await this.prisma.subscription.create({
          data: {
            ticket: {
              connect: {
                id: ticketId
              }
            },
            user: {
              connect: {
                id: userId
              }
            }
            }
          })
  
        } catch (error) { 
            if(error){
              throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST)
            }
          
        }
      
          
       }

       /*FIND*/

       async findSubscriptionById(id: string): Promise<Subscription> {
        try {
    
          const subscription = await this.prisma.subscription.findUnique({
            where: {
              id
            }
          })
          return subscription
    
          } catch (error) { 
              if(error){
                throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST)
              }
            
          }
       }

       async findAllSubscriptions(): Promise<Subscription[]> {

        try {
    
          const subscriptions = await this.prisma.subscription.findMany()
          
          return subscriptions
    
          } catch (error) { 
              if(error){
                throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST)
              }
            
          }
       }


       /*CREATE PARTNER*/

       async createPartner(data: CreatePartnerDTO, subscriptionId: string): Promise<void> {

        try {
    
          const partner = await this.prisma.partner.create({
            data: {
              ...data,
              subscription: {
                connect: {
                  id: subscriptionId
                }
              }
              }
            })
    
          } catch (error) { 
              if(error){
                throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST)
              }
            
          }
       }



       /*PAYMENT*/

       async createPayment(data: any): Promise<void> {
          try {
           
            const createPayment = await pay.create({
              ...data,
              capture: true,
              notification_url: 'https://webhook.site/8ade31c2-2817-4100-8b74-e910a097cc8c'
            }
            ) 

            console.log(createPayment.response)
          
            
          } catch (error) {
            if(error){
              throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST)
            }
          }
       }

       async updatePaymentStatus(): Promise<void> {
        console.log('bateu aqui')

  
       
        const updatePay = await pay.update({
          id: 1313776927,
          status:'approved'
        }, {
          headers: {
            ['Authorization']: 'Bearer TEST-848bd8c1-5036-42a8-9318-b5371b5d539f',
            ['Content-Type']: 'application/json'
          },
          
        })

        
        console.log(updatePay)
        
       }
}
