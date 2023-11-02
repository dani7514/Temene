import { IsNotEmpty, MaxLength } from "class-validator";
import mongoose from "mongoose";

export class createCourseDto {
  
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  instructor: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  duration: number;
  
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  language: string;
  
  @IsNotEmpty()
  level: string;
}
