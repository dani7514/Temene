import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { CoursesSchema } from "src/courses/Schemas/courses.schema";


@Schema({
    timestamps: true
})
export class Users {

    @Prop({required: true})
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    profile_picture: string;

    @Prop({unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop()
    salt: string;

    @Prop({ref:"Users", type: [mongoose.Schema.Types.ObjectId]})
    student: mongoose.Schema.Types.ObjectId[];

    @Prop({ref: "Courses", type: [mongoose.Schema.Types.ObjectId]})
    courses_enrolled: mongoose.Schema.Types.ObjectId[];

    @Prop({ref: "Courses", type: [mongoose.Schema.Types.ObjectId]})
    courses_created: mongoose.Schema.Types.ObjectId[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);