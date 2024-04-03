import { Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";
import { CreateUserDto } from "../dto/create-user.dto";

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
        } catch(e){
            console.log(e);
        }
    }
}