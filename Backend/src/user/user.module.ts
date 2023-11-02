import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule} from '@nestjs/mongoose'
import { UsersSchema } from './Schemas/user.schema';
import { CoursesModule } from 'src/courses/courses.module';
import { AuthModule } from 'src/auth/auth.module';
import { CoursesSchema } from 'src/courses/Schemas/courses.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
    {
      name: 'Users',
      schema: UsersSchema,
    },
    
      {
        name: 'Courses',
        schema: CoursesSchema,
      },
  ]),
],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
