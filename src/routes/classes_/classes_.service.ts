import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-classes_.dto';
import { UpdateClassDto } from './dto/update-classes_.dto';

@Injectable()
export class ClassesService {
  create(createClassDto: CreateClassDto) {
    return 'This action adds a new class';
  }

  findAll() {
    return `This action returns all classes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} class`;
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
