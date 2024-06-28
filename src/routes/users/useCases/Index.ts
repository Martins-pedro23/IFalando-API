import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserUseCase } from './CreateUserUseCase';
import { LoginUserUseCase } from './LoginUserUseCase';
import { FindAllUsersUseCase } from './FindAllUsersUseCase';
import { FindUsersByIdUseCase } from './FindUsersByIdUseCase';

@Injectable()
export class UserUseCases {
  constructor(
    public createUserUse: CreateUserUseCase,
    public loginUserUseCase: LoginUserUseCase,
    public findAllUsersUseCase: FindAllUsersUseCase,
    public findUserByIdUseCase: FindUsersByIdUseCase,
  ) {}
}
