import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [PrismaModule, AdminModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
