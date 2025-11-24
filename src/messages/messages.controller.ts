import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
 
 
@Controller('messages')
 
export class MessagesController {
 
  Messagesservice:MessagesService 
  constructor(){
    this.Messagesservice=new MessagesService
  }
    @Get()
    listMessages(){
      return this.Messagesservice.findAll() 
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
//console.log(body["content"]);
return this.Messagesservice.create(body.content)
}

}