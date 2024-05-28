import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/service/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService){}

  async create(createUserDto: CreateUserDto) {
    const result = await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: createUserDto.password,
      }
    });
    return result;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string){
    const result = await this.prismaService.user.findFirst({
      where: {
        email: email
      },
      select: {
        userID: true,
        icon: true,
        permission: true,
        Classes: true,
        email: true,
        name: true,
      }
    });

    return result;
  }

  async findByEmailWithPassword(email: string){
    const result = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
      select: {
        userID: true,
        icon: true,
        permission: true,
        Classes: true,
        email: true,
        name: true,
        password: true,
      }
    });

    return result;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
