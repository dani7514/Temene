import { ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UserLoginDto } from 'src/user/dtos/login.dto';
import { SignupDto } from 'src/user/dtos/signup.dto';
import { Users } from 'src/user/Schemas/user.schema';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
    ){}

    async signUp(userInfo: SignupDto):Promise<Users>{
        return this.usersService.createUser(userInfo);
    }

    async login(
        loginInfo: UserLoginDto
       ): Promise<{ accessToken: string }> {
         const {email, password} = loginInfo;
         const user: any = await this.usersService.getUser(email);
         if (!user) {
           throw new NotFoundException('User Not Found');
         }
         const hashedPwd = await bcrypt.hash(password, user.salt);
     
         if (!(hashedPwd === user.password)) {
           throw new ForbiddenException('Invalid credentials');
         }
     
         const payload = {
           email,
           id: user.id
         };
         const accessToken = await this.jwtService.sign(payload);
         return { accessToken };
       }

}
