import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { AdminAuthDto } from './dto';
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
}

