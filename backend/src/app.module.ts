import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { AdminModule } from './admin/admin.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    AdminModule,
    MenuModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
