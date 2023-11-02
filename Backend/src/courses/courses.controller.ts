import {
    Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { query } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { CoursesService } from './courses.service';
import { createCourseDto } from './dtos/create-course.dto';
import { queryStringDto } from './dtos/query-string.dto';
import { returnCourseDto } from './dtos/return-course.dto';
import { Courses } from './Schemas/courses.schema';

@Controller('courses')
export class CoursesController {

  constructor(private readonly coursesService: CoursesService){}
  
  @Get()
  async getAllCourses(@Query() queryString: queryStringDto):Promise<{courses: Courses[], count
    : number}>{
    return await this.coursesService.getAllCourses(queryString);
  }

  @Get(":id")
  async getCourse(@Param("id") id: string):Promise<returnCourseDto>{
    return await this.coursesService.getCourse(id);
  }

  @Post("thumbnail/:id")
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './Images',
        filename(req, file, callback) {
          callback(null, Date.now() + path.extname(file.originalname));
        },
      }),
    }),
  )
  async uploadedFile(@UploadedFile() file: Express.Multer.File, @Param("id") id: string) {

    await this.coursesService.insertImage(id, file.filename);
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  async createCourse(@Req() request: any, @Body() courseInfo: createCourseDto):Promise<returnCourseDto>{
    return await this.coursesService.createCourse(request.user.id, courseInfo);
  }
  
  @Patch(":id")
  @UseGuards(AuthGuard('jwt'))
  // @UsePipes(ValidationPipe)
  async updateCourse(@Param("id") id: string, @Body() courseInfo: Courses):Promise<Courses>{
    return await this.coursesService.updateCourse(id, courseInfo);
  }

  @Delete(":id")
  @UseGuards(AuthGuard('jwt'))
  async deleteCourse(@Param("id") id: string, @Body() email:string):Promise<void>{
    return this.coursesService.deleteCourse(id, email);
  }
  
}
