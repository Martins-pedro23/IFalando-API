import { Classes } from "src/interfaces/IClasses";

export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    icon?: string;
    permission: string;
    classes: Classes[];
}