import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class SignupDto{
    @IsString()
    @Length(3, 11)
    first_name: string;

    @IsString()
    @Length(3, 11)
    last_name: string;
   
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
    
}