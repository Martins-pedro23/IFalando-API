import { IsEmail, IsNotEmpty, Min, isNotEmpty } from "class-validator";
import { IClasses } from "src/interfaces/IClasses";

export class CreateUserDto {
    @IsNotEmpty() name: string;
    @IsNotEmpty() @IsEmail() email: string;
    @IsNotEmpty() @Min(8) password: string;
    icon?: string;
    permission: string;
    classes: IClasses[];
}