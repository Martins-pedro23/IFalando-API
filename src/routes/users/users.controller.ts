import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserUseCases } from './useCases/Index';
import { ISearchModel } from 'src/interfaces/ISearchModel';
import { SearchUsersParams } from './enum/SearchUsersParams';

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

  @Get()
  async findAll(@Query() param: ISearchModel<SearchUsersParams>) {
    return await this.userUseCase.findAllUsersUseCase.execute(param);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userUseCase.findUserByIdUseCase.execute(id);
  }

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userUseCase.updateUserUseCase.execute(+id, updateUserDto);
  }
  
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userUseCase.deleteUserUseCase.execute(+id);
  }
}
