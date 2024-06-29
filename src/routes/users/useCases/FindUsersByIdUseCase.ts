import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class FindUsersByIdUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(id: string) {
    try {
      const parsedId = parseInt(id);

      if (!parsedId || isNaN(parsedId)) {
        throw new HttpException('Id not provided', 400);
      }

      const result = await this.usersService.findOne(parsedId);

      if (!result) {
        throw new HttpException('User not found', 404);
      }

      return {
        message: 'User found',
        status: 200,
        data: result,
      };
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
