import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "./messages.entity";
import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) 
    private messageRepository: MongoRepository<Message>  // Changed to MongoRepository
  ) {}

  async findOne(id: string): Promise<Message> {
    // Convert string to ObjectId
    const objectId = new ObjectId(id);
    const message = await this.messageRepository.findOne({ where: { id: objectId } });
    
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    
    return message;
  }

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  async create(content: string, status: string): Promise<Message> {
    try {
      const message = this.messageRepository.create({ content, status });
      await this.messageRepository.save(message);
      return message;
    } catch (error) {
      console.error("Error during save operation:", error);
      throw new InternalServerErrorException("Failed to save the message");
    }
  }
}