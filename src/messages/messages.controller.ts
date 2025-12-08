import { Body, Controller, Get, Injectable, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
 
@Injectable()
 
@Controller('messages')
 
export class MessagesController {
  constructor(private readonly MessagesService:MessagesService){}
 
  
 
   @Get()
    listMessages(){
      return this.MessagesService.findAll() 
    }
 
    @Get("/:id")
    getMessage(@Param("id")id:string){
        console.log(id)
    }
 
   /* @Post()
createMessage(@Body() body: CreateMessageDto) {
  console.log(body);
  return { message: 'Message received!', data: body };
  
} */



 @Post()
createMessage(@Body() body) {

return this.MessagesService.create(body.content,body.status)
}

}