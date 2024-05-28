import { Injectable } from '@nestjs/common';
import { PrismaService } from './service/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService){}

  async getHello() {
    return "hello world";
  }
}
