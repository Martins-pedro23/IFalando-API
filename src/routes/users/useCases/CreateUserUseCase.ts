import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bycrypt from 'bcryptjs';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(createUserDto: CreateUserDto) {
    try {
      const verifyEmail = await this.usersService.findByEmail(
        createUserDto.email,
      );
      if (verifyEmail) {
        throw new HttpException('Email already exists', 400);
      }

      createUserDto.password = await bycrypt.hash(createUserDto.password, 8);

      const result = await this.usersService.create(createUserDto);

      if (!result) {
        throw new HttpException('Error creating user', 500);
      }

      return {
        message: 'User created successfully',
        status: 201,
        data: result,
      };
    } catch (e) {
        throw new HttpException(e.message, e.status);
    }
  }
}
