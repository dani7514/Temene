import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserLoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}