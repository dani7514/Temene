import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt/dist';
import { jwtConfig } from 'src/config/jwt.config';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesSchema } from 'src/courses/Schemas/courses.schema';

@Module({
  imports: [
    UserModule,
     PassportModule,
      JwtModule.registerAsync(jwtConfig),
      MongooseModule.forFeature([
        {
          name: 'Courses',
          schema: CoursesSchema,
        },
      ])
    ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy]
})
export class AuthModule {}
