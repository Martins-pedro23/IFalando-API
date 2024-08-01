import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserUseCases } from './useCases/Index';
import { CreateUserUseCase } from './useCases/CreateUserUseCase';
import { LoginUserUseCase } from './useCases/LoginUserUseCase';
import { FindAllUsersUseCase } from './useCases/FindAllUsersUseCase';
import { FindUsersByIdUseCase } from './useCases/FindUsersByIdUseCase';
import { UpdateUserUseCase } from './useCases/UpdateUserUseCase';
import { DeleteUserUseCase } from './useCases/DeleteUserUseCase';
import { UserTokenVerifyUseCase } from './useCases/UserTokenVerifyUseCase';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserUseCases, CreateUserUseCase, LoginUserUseCase, FindAllUsersUseCase, FindUsersByIdUseCase, UpdateUserUseCase, DeleteUserUseCase, UserTokenVerifyUseCase],
})
export class UsersModule {}
