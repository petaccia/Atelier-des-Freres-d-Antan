import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GoogleReviewsService } from './google-reviews.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('google-reviews')
@Controller('google-reviews')
export class GoogleReviewsController {
  constructor(private readonly googleReviewsService: GoogleReviewsService) {}

  @Get()
  @ApiOperation({ summary: 'Get Google reviews' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns Google reviews',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          author_name: { type: 'string' },
          rating: { type: 'number' },
          text: { type: 'string' },
          time: { type: 'number' },
          profile_photo_url: { type: 'string' }
        }
      }
    }
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit the number of reviews returned' })
  async getGoogleReviews(@Query('limit') limit?: number) {
    return this.googleReviewsService.getGoogleReviews(limit);
  }

  @Get('refresh')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Refresh Google reviews cache' })
  @ApiResponse({ status: 200, description: 'Cache refreshed successfully' })
  async refreshCache() {
    return this.googleReviewsService.refreshCache();
  }
}
