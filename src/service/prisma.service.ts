import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
    private static _instance: PrismaService | null;
    async onModuleInit(){
        await this.$connect();
        console.log('🧩 Prisma connected');
    }
}