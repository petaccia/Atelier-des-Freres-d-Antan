import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async check() {
    let dbStatus = 'ok';
    let error = null;

    try {
      // Vérifier la connexion à la base de données
      await this.prisma.$queryRaw`SELECT 1`;
    } catch (e) {
      dbStatus = 'error';
      error = e.message;
    }

    return {
      status: 'ok',
      database: dbStatus,
      error,
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    };
  }
}