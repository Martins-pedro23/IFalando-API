import { Module } from '@nestjs/common';
import { ClassesService } from './classes_.service';
import { ClassesController } from './classes_.controller';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
