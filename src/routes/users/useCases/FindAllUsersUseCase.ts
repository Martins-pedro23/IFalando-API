import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute() {
    try {
      const users = await this.usersService.findAll();
      if (!users) {
        throw new HttpException('Users not found', 404);
      }

      return {
        message: 'Users found',
        status: 200,
        data: users,
      };
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
