import { Classes } from "@prisma/client";
import { IsEmail, IsNotEmpty, Min, isNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
    icon?: string;
    permission?: string;
    classes?: Classes[];
}