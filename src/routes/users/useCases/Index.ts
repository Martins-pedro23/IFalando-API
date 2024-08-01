import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserUseCase } from './CreateUserUseCase';
import { LoginUserUseCase } from './LoginUserUseCase';
import { FindAllUsersUseCase } from './FindAllUsersUseCase';
import { FindUsersByIdUseCase } from './FindUsersByIdUseCase';
import { UpdateUserUseCase } from './UpdateUserUseCase';
import { DeleteUserUseCase } from './DeleteUserUseCase';
import { UserTokenVerifyUseCase } from './UserTokenVerifyUseCase';

@Injectable()
export class UserUseCases {
  constructor(
    public createUserUse: CreateUserUseCase,
    public loginUserUseCase: LoginUserUseCase,
    public userTokenVerifyUseCase: UserTokenVerifyUseCase,
    public findAllUsersUseCase: FindAllUsersUseCase,
    public findUserByIdUseCase: FindUsersByIdUseCase,
    public updateUserUseCase: UpdateUserUseCase,
    public deleteUserUseCase: DeleteUserUseCase,
  ) {}
}
