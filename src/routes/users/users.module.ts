import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/service/prisma.service';
import { UserUseCases } from './useCases/Index';
import { CreateUserUseCase } from './useCases/CreateUserUseCase';
import { LoginUserUseCase } from './useCases/LoginUserUseCase';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UserUseCases, CreateUserUseCase, LoginUserUseCase],
})
export class UsersModule {}
