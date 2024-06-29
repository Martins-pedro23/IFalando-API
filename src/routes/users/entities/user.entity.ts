import { Classes } from "@prisma/client";

export class User {
    userID: number;
    name: string;
    email: string;
    password: string;
    icon?: string;
    permission?: string;
    Classes?: Classes[];
}
