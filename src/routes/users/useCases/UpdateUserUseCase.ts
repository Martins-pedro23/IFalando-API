import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bycrypt from 'bcryptjs';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(id: number, data: UpdateUserDto) {
    try {
      if (!id) {
        throw new HttpException('Id not provided', 400);
      }

      if (!data) {
        throw new HttpException('Data not provided', 400);
      }

      if (data.password) {
        data.password = await bycrypt.hash(data.password, 8);
      }

      const result = await this.usersService.update(id, data);

      if (!result) {
        throw new HttpException('Error updating user', 500);
      }

      return {
        message: 'User updated successfully',
        status: 200,
        data: result,
      };
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
