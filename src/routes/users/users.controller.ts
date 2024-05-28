import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserUseCases } from './useCases/Index';

@Controller('users')
export class UsersController {
  constructor(private readonly userUseCase: UserUseCases) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userUseCase.createUserUse.execute(createUserDto);
  }

  @Post('login')
  async login(@Body() login: {email: string, password: string}) {
    return await this.userUseCase.loginUserUseCase.execute(login.email, login.password);
  }
/* 
  @Get()
  findAll() {
    return 'lalala';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return id;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  } */
}
