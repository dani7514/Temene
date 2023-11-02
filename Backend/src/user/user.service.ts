import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose'
import { Users } from './Schemas/user.schema';
import { SignupDto } from './dtos/signup.dto';
import { CoursesService } from 'src/courses/courses.service';
import { Courses } from 'src/courses/Schemas/courses.schema';

@Injectable()
export class UserService {

    constructor(
        @InjectModel("Users") private readonly usersModel:Model<Users>,
        @InjectModel("Courses") private readonly coursesModel: Model<Courses>,
        ){}
    
    async getUser(email: string): Promise<Users> {
        return await (await this.usersModel.findOne({ email })).populate(["student", "courses_enrolled", "courses_created"]);
    } 

    async getAllUsers(): Promise<{users:Users[], count: number}> {
        const users = await this.usersModel.find();
        const count = await this.usersModel.count();
        return {users, count}
    }

    async createUser(userInfo: SignupDto): Promise<Users>{
        const {first_name, last_name, password, email} = userInfo;
        const [hashedPwd, salt] = await this.hashPwd(password);
        return await this.usersModel.create({first_name, last_name, email, password:hashedPwd, salt, profile_picture: ""});
    }

    async updateUser(original_email: string, userInfo: SignupDto): Promise<Users>{
        const {first_name, last_name, password, email} = userInfo;
        let updateObj: any = {};
        if (first_name) updateObj.first_name = first_name;
        if (last_name) updateObj.last_name = last_name;
        if (email) updateObj.email = email;
        if (password) {
            const [hashedPwd, salt] = await this.hashPwd(password);
            updateObj.password = hashedPwd;
            updateObj.salt = salt; 
        }
        console.log(updateObj)
        return await this.usersModel.findOneAndUpdate( {email: original_email}, updateObj, {returnDocument: "after"}).populate(["student", "courses_enrolled", "courses_created"]);
    }

    async isUserEnrolled(email: string, id: string):Promise<Boolean>{
        const user = await this.usersModel.findOne({email});
        const userEnrolled = user.courses_enrolled;
        const isEnrolled = Array.prototype.some.call(userEnrolled, (courseId) => courseId === id) as boolean;
        return isEnrolled;
    }

    async isUserInstructor(email: string):Promise<Boolean>{
        const user = await this.usersModel.findOne({email});
        return Boolean(user.student);
    }

    async enrollUser (email: string, id: string): Promise<Users>{
        const course = await this.coursesModel.findByIdAndUpdate(id, {$inc: {student_number: 1}}, {returnDocument: "after"} ).populate("instructor") as any;
        if (!course) throw new NotFoundException('Course Not Found');
        
        const user = await this.usersModel.findOneAndUpdate({email}, {$addToSet: {courses_enrolled: id}}, {returnDocument: "after"}).populate(["student", "courses_enrolled", "courses_created"]);
        // const course = await this.coursesService.getCourse(id) as any;

        const instructorEmail = course.instructor.email;

        await this.addStudent(instructorEmail, user.id);
        return user;
    }

    async addCourse (ori_id: string, id: string): Promise<Users>{
        return this.usersModel.findByIdAndUpdate(ori_id, {$addToSet: {courses_created: id}}, {returnDocument: "after"}).populate(["student", "courses_enrolled", "courses_created"]);
    }

    async deleteCourse (email: string, id: string): Promise<Users>{
        return this.usersModel.findOneAndUpdate({email}, {$pop: {courses_created: id}}, {returnDocument: "after"}).populate(["student", "courses_enrolled", "courses_created"]);

    }
    async addStudent (email: string, id: string): Promise<Users>{
        return this.usersModel.findOneAndUpdate({email}, {$addToSet: {student: id}}, {returnDocument: "after"}).populate(["student", "courses_enrolled", "courses_created"]);

    }

    async insertImage(email: string, imageUrl: string): Promise<Users> {
        return await this.usersModel.findOneAndUpdate({email}, { profile_picture: imageUrl }, {returnDocument: "after"}).populate(["student", "courses_enrolled", "courses_created"]);
    }

    async deleteUser(email: string): Promise<void>{
        return await this.usersModel.findOneAndDelete({email});
    }


    async hashPwd(password: string) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPwd = await bcrypt.hash(password, salt)
        return [hashedPwd, salt]
    }
}
