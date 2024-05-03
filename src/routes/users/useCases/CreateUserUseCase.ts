import { Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";
import { CreateUserDto } from "../dto/create-user.dto";
import * as bcrypt from 'bcryptjs';
import { create } from "domain";

@Injectable()
export class CreateUserUseCase{
    constructor(private readonly usersService: UsersService){}

    async execute(createUserDto: CreateUserDto){
        try{
            const verifyEmail = await this.usersService.findByEmail(createUserDto.email);
            if(verifyEmail){
                return {
                    message: "Email already exists",
                    status: 400
                }
            }

            createUserDto.password = await bcrypt.hash(createUserDto.password);

            if(createUserDto.password[createUserDto.password.length - 1] === ' '){
                createUserDto.password = createUserDto.password.slice(0, -1);
            }

            createUserDto.password = createUserDto.password.toLowerCase();

            const result = await this.usersService.create(createUserDto);
            return result;
        } catch(e){
            console.log(e);
        }
    }
}