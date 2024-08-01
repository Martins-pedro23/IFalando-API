import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import * as JWT from 'jsonwebtoken';
import * as bycrypt from 'bcryptjs';

interface TokenPayload {
  email: string;
}

@Injectable()
export class UserTokenVerifyUseCase {
  constructor(private readonly usersService: UsersService) {}
  async execute(token: string) {
    try {
      if (!token) {
        throw new HttpException('Token not provided', 400);
      }

      const decodedToken = JWT.verify(
        token,
        process.env.JWT_SECRET,
      ) as TokenPayload;

      if (!decodedToken) {
        throw new HttpException('Invalid token', 400);
      }

      const userEmail = decodedToken.email;

      if (!userEmail) {
        throw new HttpException('Invalid token', 400);
      }

      const user = await this.usersService.findByEmail(userEmail);

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      const userJWT = JWT.sign({ 
        userID: user.userID,
        icon: user.icon,
        email: user.email,
        name: user.name,
        permission: user.permission,
        classes: user.Classes,
       }, process.env.JWT_SECRET);

      return {
        message: 'User found',
        status: 200,
        data: userJWT,
      };
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
