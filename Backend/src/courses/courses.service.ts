import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { createCourseDto } from './dtos/create-course.dto';
import { queryStringDto } from './dtos/query-string.dto';
import { returnCourseDto } from './dtos/return-course.dto';
import { Courses } from './Schemas/courses.schema';

@Injectable()
export class CoursesService {
    constructor(
        @InjectModel("Courses") private readonly coursesModel: Model<Courses>,
        private readonly userService: UserService,
    ){}

    async createCourse(id:string, courseDetail: createCourseDto):Promise<returnCourseDto> {
        const course = await (await this.coursesModel.create({...courseDetail, instructor: id, student_number: 0, thumbnail: ""})).populate("instructor"); 
        const courseID = course.id;
        await this.userService.addCourse(id, courseID);
        return course;
    }

    async getCourse(id: string):Promise<returnCourseDto>{
        const course = this.coursesModel.findById(id).populate("instructor");
        if (!course) throw new NotFoundException('Course Not Found');
        return course;
    }

    async getAllCourses(queryString: queryStringDto): Promise<{courses: Courses[], count
    : number}>{
        const queryObj = {...queryString};
        if(queryObj.search) delete queryObj.search;

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        let searchQuery =  { title: {
            $regex: queryString.search || "",
            $options: 'i',
          },}
        
        const courses = await this.coursesModel.find({...JSON.parse(queryStr), ...searchQuery}).populate("instructor").exec();
        const count = await this.coursesModel.count({...JSON.parse(queryStr), ...searchQuery});
        return {courses, count}
    }

    async updateCourse(id: string, courseInfo: Courses): Promise<Courses>{
        const {title, price, description, language, level } = courseInfo;
        let updateObj: any = {};
        if (title) updateObj.title = title;
        if (price) updateObj.price = price;
        if (description) updateObj.description = description;
        if (language) updateObj.language = language;
        if (level) updateObj.level = level; 

        return await this.coursesModel.findByIdAndUpdate(id, updateObj, {returnDocument: "after"}).populate("instructor");
    }

    async insertImage(id: string, imageUrl: string): Promise<Courses> {
        return await this.coursesModel.findByIdAndUpdate(id, { thumbnail: imageUrl }, {returnDocument: "after"}).populate("instructor");
    }
    async deleteCourse(id: string, email: string):Promise<void>{
        await this.coursesModel.findByIdAndDelete(id);
        this.userService.deleteCourse(email, id);
    }

}
