import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getMainMenu() {
    const menu = await this.prisma.menu.findFirst({
      where: { name: 'main_menu', isActive: true },
      include: {
        menuItems: {
          where: { parentId: null },
          orderBy: { order: 'asc' },
          include: {
            children: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    return menu;
  }
}
