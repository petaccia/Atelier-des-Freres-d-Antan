import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AdminAuthDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminAuthService {
  constructor(private prisma: PrismaService) {}

  async validateAdmin(adminAuthDto: AdminAuthDto) {
    // Rechercher l'admin avec le username non hashé
    const admin = await this.prisma.admin.findUnique({
      where: {
        username: adminAuthDto.username,

      },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });

    if (!admin) {
      throw new UnauthorizedException('Identification non reconnue');
    }

    // Vérifier le mot de passe
    const passwordValid = await bcrypt.compare(adminAuthDto.password, admin.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Identification non reconnue');
    }

    // Retourner l'admin sans le mot de passe
    const { password, ...adminWithoutPassword } = admin;
    return adminWithoutPassword;
  }
}
