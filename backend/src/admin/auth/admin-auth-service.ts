import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminAuthDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminAuthService {
  constructor(private prisma: PrismaService) {}

  async validateAdmin(adminAuthDto: AdminAuthDto) {
    const admin = await this.prisma.user.findUnique({
      where: { email: adminAuthDto.email, role: 'ADMIN' },
    });

    if (!admin) {
      throw new UnauthorizedException('Indentification non reconnue.');;
    }

    const passwordValid = await bcrypt.compare(adminAuthDto.password, admin.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Indentification non reconnue.');;
    }

    return admin;
  }
}