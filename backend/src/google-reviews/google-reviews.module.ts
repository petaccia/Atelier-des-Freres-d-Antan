import { Module } from '@nestjs/common';
import { GoogleReviewsController } from './google-reviews.controller';
import { GoogleReviewsService } from './google-reviews.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [GoogleReviewsController],
  providers: [GoogleReviewsService],
  exports: [GoogleReviewsService],
})
export class GoogleReviewsModule {}
