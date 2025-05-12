import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { AdminModule } from './admin/admin.module';
import { MenuModule } from './menu/menu.module';
import { GoogleReviewsModule } from './google-reviews/google-reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    HealthModule,
    AdminModule,
    MenuModule,
    GoogleReviewsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
