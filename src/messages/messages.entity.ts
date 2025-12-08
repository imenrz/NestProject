import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity() 
export class Message{
    @ObjectIdColumn()
id :ObjectId
@Column()
content :string
@Column()
status:string
@Column({default:()=>'Curent_TimeStamp'})
date:Date
}