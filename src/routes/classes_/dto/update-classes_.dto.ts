import { PartialType } from '@nestjs/mapped-types';
import { CreateClassDto } from './create-classes_.dto';

export class UpdateClassDto extends PartialType(CreateClassDto) {}
