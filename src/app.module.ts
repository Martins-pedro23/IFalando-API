import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './routes/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './service/prisma.service';
import { PrismaModule } from './service/prisma.module';

@Module({
  imports: [UsersModule, ConfigModule.forRoot(), PrismaModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
