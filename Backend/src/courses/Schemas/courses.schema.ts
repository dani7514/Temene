import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UsersSchema } from 'src/user/Schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Courses {
  @Prop()
  title: string;

  @Prop()
  thumbnail: string;

  @Prop({ref: "Users", type: mongoose.Schema.Types.ObjectId})
  instructor: mongoose.Schema.Types.ObjectId;

  @Prop()
  price: number;

  @Prop()
  duration: number;

  @Prop()
  student_number: number;

  @Prop()
  description: string;

  @Prop()
  language: string;

  @Prop()
  level: string;

}

export const CoursesSchema = SchemaFactory.createForClass(Courses)