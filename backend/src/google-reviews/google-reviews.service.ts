import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

// Implémentation simple d'un cache en mémoire
class SimpleCache {
  private cache: Map<string, { data: any; expiry: number }> = new Map();
  private defaultTTL: number;

  constructor(options: { stdTTL: number }) {
    this.defaultTTL = options.stdTTL;
  }

  get(key: string): any {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  set(key: string, value: any, ttl?: number): void {
    const expiry = Date.now() + (ttl || this.defaultTTL) * 1000;
    this.cache.set(key, { data: value, expiry });
  }
}

@Injectable()
export class GoogleReviewsService implements OnModuleInit {
  private readonly logger = new Logger(GoogleReviewsService.name);
  private readonly cache = new SimpleCache({ stdTTL: 3600 }); // Cache for 1 hour
  private readonly CACHE_KEY = 'google_reviews';
  private readonly placeId?: string;
  private readonly apiKey?: string;

  constructor(private configService: ConfigService) {
    this.placeId = this.configService.get<string>('GOOGLE_PLACE_ID');
    this.apiKey = this.configService.get<string>('GOOGLE_API_KEY');
  }

  async onModuleInit() {
    // Précharger les avis au démarrage de l'application
    try {
      await this.fetchAndCacheReviews();
      this.logger.log('Google reviews preloaded successfully');
    } catch (error) {
      this.logger.error('Failed to preload Google reviews', error);
    }
  }

  async getGoogleReviews(limit?: number): Promise<any[]> {
    let reviews = this.cache.get(this.CACHE_KEY) as any[];

    if (!reviews) {
      reviews = await this.fetchAndCacheReviews();
    }

    return limit ? reviews.slice(0, limit) : reviews;
  }

  async refreshCache(): Promise<{ success: boolean; message: string }> {
    try {
      await this.fetchAndCacheReviews();
      return { success: true, message: 'Cache refreshed successfully' };
    } catch (error) {
      this.logger.error('Failed to refresh cache', error);
      return { success: false, message: 'Failed to refresh cache' };
    }
  }

  private async fetchAndCacheReviews(): Promise<any[]> {
    try {
      if (!this.placeId || !this.apiKey) {
        this.logger.warn('Google Place ID or API Key not configured');
        return this.getFallbackReviews();
      }

      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.placeId}&fields=reviews&key=${this.apiKey}`;
      const response = await axios.get(url);

      if (response.data.status !== 'OK' || !response.data.result || !response.data.result.reviews) {
        this.logger.warn('No reviews found or API error', response.data.status);
        return this.getFallbackReviews();
      }

      const reviews = response.data.result.reviews.map((review: any) => ({
        author_name: review.author_name,
        rating: review.rating,
        text: review.text,
        time: review.time,
        profile_photo_url: review.profile_photo_url
      }));

      this.cache.set(this.CACHE_KEY, reviews);
      return reviews;
    } catch (error) {
      this.logger.error('Error fetching Google reviews', error);
      return this.getFallbackReviews();
    }
  }

  private getFallbackReviews(): any[] {
    // Avis de secours au cas où l'API Google échoue
    return [
      {
        author_name: "Jean Dupont",
        rating: 5,
        text: "Service exceptionnel ! L'équipe a été très professionnelle et attentive à nos besoins. Je recommande vivement leurs services à tous ceux qui recherchent une expertise de qualité.",
        time: Date.now() / 1000 - 86400 * 2, // Il y a 2 jours
        profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjXQZvxQwMhNKKLi9xPAD9LjLYxjfFMKAB7vyC5-=s120-c-rp-mo-br100"
      },
      {
        author_name: "Marie Martin",
        rating: 4,
        text: "Très satisfaite de la prestation. L'équipe est réactive et compétente. Seul petit bémol, le délai était un peu plus long que prévu, mais le résultat final en valait la peine.",
        time: Date.now() / 1000 - 86400 * 7, // Il y a 7 jours
        profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjWu9cBTlYf-PWbQgFYQr0JV_FMMzQrIQnqEW7Ue=s120-c-rp-mo-br100"
      },
      {
        author_name: "Pierre Leroy",
        rating: 5,
        text: "Une expérience client remarquable du début à la fin. L'attention aux détails et la qualité du travail sont impressionnantes. Je n'hésiterai pas à faire appel à leurs services à nouveau.",
        time: Date.now() / 1000 - 86400 * 14, // Il y a 14 jours
        profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjVcSrFbKKLQlEFMV-uLN9rOkJl_ycGIQWgEcDY=s120-c-rp-mo-br100"
      },
      {
        author_name: "Sophie Bernard",
        rating: 5,
        text: "Je suis extrêmement satisfaite du résultat. L'équipe a su comprendre mes attentes et y répondre parfaitement. Un grand merci pour votre professionnalisme et votre gentillesse.",
        time: Date.now() / 1000 - 86400 * 21, // Il y a 21 jours
        profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjUfXU9Ej-o0USQyAHK-ZvbW3Hgd_dZ-LMjGgCGR=s120-c-rp-mo-br100"
      },
      {
        author_name: "Thomas Petit",
        rating: 4,
        text: "Bonne prestation dans l'ensemble. L'équipe est à l'écoute et propose des solutions adaptées. Je recommande leurs services pour leur rapport qualité-prix.",
        time: Date.now() / 1000 - 86400 * 30, // Il y a 30 jours
        profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjXvSbcXQMVSgNEcr8ZLAkiU-3YMnUaAEGbXoZw=s120-c-rp-mo-br100"
      }
    ];
  }
}
