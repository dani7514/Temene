import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './courses.controller';
import { MulterModule } from '@nestjs/platform-express';
import { CoursesSchema } from './Schemas/courses.schema';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: 'Courses',
        schema: CoursesSchema,
      },
    ]),
    MulterModule.register({
      dest: './Images',
    }),
    
  ],
  providers: [CoursesService],
  controllers: [CoursesController],
  exports: [CoursesService]
})
export class CoursesModule {}
