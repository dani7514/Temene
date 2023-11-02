import { Body, Controller, Get, Param, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserLoginDto } from 'src/user/dtos/login.dto';
import { SignupDto } from 'src/user/dtos/signup.dto';
import { Users } from 'src/user/Schemas/user.schema';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
     private readonly configService: ConfigService,
     private readonly usersService: UserService) {}
    
  @Post('signup')
  @UsePipes(ValidationPipe)
  async signUp(@Body() userInfo: SignupDto): Promise<Users> {
    return await this.authService.signUp(userInfo);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(
    @Body() loginInfo: UserLoginDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.login(loginInfo);
  }

  @Post('check')
  async checkJwt(@Body('token') token: string): Promise<any> {
    try {
      jwt.verify(token, this.configService.get<string>('JWT_SECRET'));
      return { response: true };
    } catch {
      return { response: false };
    }
  }

}
