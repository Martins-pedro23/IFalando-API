import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { LoginUserUseCase } from "./LoginUserUseCase";

@Injectable()
export class UserUseCases{
    constructor(public createUserUse: CreateUserUseCase, public loginUserUseCase: LoginUserUseCase){}
}