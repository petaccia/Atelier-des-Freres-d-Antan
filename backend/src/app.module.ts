import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [PrismaModule, AdminModule, MenuModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
