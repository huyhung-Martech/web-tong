import { Module } from '@nestjs/common';
import { ApiController } from './controllers/api.controller';
import { ApiService } from './services/api.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [ApiController],
  providers: [ApiService, PrismaService],
})
export class AppModule {}
