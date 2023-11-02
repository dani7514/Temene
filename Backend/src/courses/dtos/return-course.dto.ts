import mongoose from "mongoose";

export class returnCourseDto {
  title: string;
  instructor: mongoose.Schema.Types.ObjectId;
  thumbnail: string;
  duration: number;
  student_number: number;
  price: number;
  description: string;
  language: string;
  level: string;
}
