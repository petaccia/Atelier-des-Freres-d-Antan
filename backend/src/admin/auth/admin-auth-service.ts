import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { AdminAuthDto, RefreshTokenDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminAuthService {
  private prisma = new PrismaClient();

  constructor(private jwtService: JwtService) {}

  async validateAdmin(authDto: AdminAuthDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { username: authDto.username },
    });

    if (!admin) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const passwordValid = await bcrypt.compare(authDto.password, admin.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const access_token = this.jwtService.sign({
      sub: admin.id,
      username: admin.username
    });

    return { admin, access_token };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      // Vérifier si le token est valide
      const payload = this.jwtService.verify(refreshTokenDto.token);

      // Vérifier si l'utilisateur existe toujours
      const admin = await this.prisma.admin.findUnique({
        where: { id: payload.sub },
      });

      if (!admin) {
        throw new UnauthorizedException('Utilisateur non trouvé');
      }

      // Générer un nouveau token
      const access_token = this.jwtService.sign({
        sub: admin.id,
        username: admin.username
      });

      return {
        id: admin.id,
        username: admin.username,
        access_token
      };
    } catch (error) {
      // Si le token est expiré ou invalide
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }
}

