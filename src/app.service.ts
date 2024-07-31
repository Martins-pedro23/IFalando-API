import { Injectable } from '@nestjs/common';
import { PrismaService } from './service/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async Health(): Promise<String> {
    try {
      await this.prismaService.$connect();
      return 'Health OK';
    } catch (e) {
      return 'Health Fail';
    }
  }
}
