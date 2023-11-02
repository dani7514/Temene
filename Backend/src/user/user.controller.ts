import { Body, Controller, Delete, Get, Patch, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { SignupDto } from './dtos/signup.dto';
import { Users } from './Schemas/user.schema';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {

    constructor(
        private readonly usersService: UserService,
    ){}

@Get("detail")
async getDetail(@Req() request: any){
    return await this.usersService.getUser(request.user.email);
}
@Get()
async getAllUsers(){
    return await this.usersService.getAllUsers();
}

  @Post("profile_picture")
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './Images',
        filename(req, file, callback) {
            console.log(file)
          callback(null, Date.now() + path.extname(file.originalname));
        },
      }),
    }),
  )
  async uploadedFile(@UploadedFile() file: Express.Multer.File, @Req() request: any) {
    await this.usersService.insertImage(request.user.email, file.filename);
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post("enroll")
  async enrollUser(@Req() request: any, @Body("id") id: string): Promise<Users>{
    const user = request.user;
    const email = user.email;
    console.log(email, typeof email);
    return await this.usersService.enrollUser(email, id);
  }
  @Patch()
//   @UsePipes(ValidationPipe)
  async updateUser(@Req() request: any, @Body() userInfo: SignupDto):Promise<Users>{
    console.log(request.user.email, userInfo)
    return await this.usersService.updateUser(request.user.email, userInfo);
  }

  @Delete()
  async deleteUser(@Req() request: any):Promise<void>{
    await this.usersService.deleteUser(request.user.email);
  }
}
