import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/service/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const result = await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: createUserDto.password,
      },
    });
    return result;
  }

  

  async findAll(pageIndex: number, pageSize: number, whereStatement?: Object) {
    const index = pageIndex || 0;
    const size = pageSize || 10;
    const skip = index * size;
    const [result, count] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        skip: skip,
        take: pageSize,
        where: whereStatement,
      }),
      this.prismaService.user.count(),
    ]);

    return {
      value: result,
      count: count,
    };
  }

  findOne(id: number) {
    const result = this.prismaService.user.findFirst({
      where: {
        userID: id,
      },
      select: {
        userID: true,
        icon: true,
        permission: true,
        Classes: true,
        email: true,
        name: true,
      },
    });

    return result;
  }

  async findByEmail(email: string) {
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
      },
    });

    return result;
  }

  async findByEmailWithPassword(email: string) {
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
      },
    });

    return result;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const result = this.prismaService.user.update({
      where: {
        userID: id,
      },
      data: {
        email: updateUserDto.email,
        name: updateUserDto.name,
        password: updateUserDto.password,
        icon: updateUserDto.icon,
        permission: updateUserDto.permission,
      },
    });
    return result;
  }

  async updateClasses(id: number, updateUserDto: UpdateUserDto) {
    const result = this.prismaService.user.update({
      where: {
        userID: id,
      },
      data: {
        Classes: {
          connect: updateUserDto.classes,
        },
      },
    });

    return result;
  }

  remove(id: number) {
    const result = this.prismaService.user.delete({
      where: {
        userID: id,
      },
    });

    return result;
  }
}
