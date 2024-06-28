import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(id: number) {
    try {

      if (!id || isNaN(id)) {
        throw new HttpException('Id not provided', 400);
      }

      const result = await this.usersService.remove(id);

      if (!result) {
        throw new HttpException('Error deleting user', 500);
      }

      return {
        message: 'User deleted successfully',
        status: 200,
        data: result,
      };
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
