import { HttpException, Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";
import * as bycrypt from 'bcryptjs';
import * as JWT from 'jsonwebtoken';

@Injectable()
export class LoginUserUseCase{
    constructor(private readonly usersService: UsersService){}

    async execute(email: string, password: string){
        try{

            if(!email){
                throw new HttpException('Email is required', 400);
            }
            
            const user = await this.usersService.findByEmailWithPassword(email);

            if(!user){
                throw new HttpException('User not found', 404);
            }

            if(!password){
                throw new HttpException('Invalid Credentials', 400);
            }

            const verifyPassword = await bycrypt.compare(password, user.password);

            if(!verifyPassword){
                throw new HttpException('Invalid Credentials', 400);
            }

            const token = JWT.sign({
                email: user.email,
            }, process.env.JWT_SECRET);

            const userData = JWT.sign({
                userID: user.userID,
                icon: user.icon,
                email: user.email,
                name: user.name,
            }, process.env.JWT_SECRET);

            return {
                message: 'User found',
                status: 200,
                token : token,
                data: userData
            };

        }catch(e){
            throw new HttpException(e.message, e.status);
        }
    }
}