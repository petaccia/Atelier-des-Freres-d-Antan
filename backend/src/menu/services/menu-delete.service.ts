import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class MenuDeleteService {
  constructor(private prisma: PrismaService) {}

  async deleteMenuItemFromBothMenus(path: string) {
    return this.prisma.$transaction(async (prisma) => {
    // Trouver les éléments de menu correspondants
    const desktopMenuItem = await this.prisma.desktopMenuItem.findFirst({
      where: { path },
      include: { children: true },
    });

    const mobileMenuItem = await this.prisma.mobileMenuItem.findFirst({
      where: { path },
      include: { children: true },
    });

    if (!desktopMenuItem && !mobileMenuItem) {
      throw new NotFoundException(`Aucun élément de menu avec le chemin ${path} n'a été trouvé`);
    }

    const results = {
      desktop: null as null | {
        id: number;
        deleted: boolean;
        hasDeletedChildren: boolean;
        childrenCount: number;
      },
      mobile: null as null | {
        id: number;
        deleted: boolean;
        hasDeletedChildren: boolean;
        childrenCount: number;
      },
    };

    // Supprimer l'élément du menu desktop s'il existe
    if (desktopMenuItem) {
      await this.prisma.desktopMenuItem.delete({ where: { id: desktopMenuItem.id } });
      results.desktop = {
        id: desktopMenuItem.id,
        deleted: true,
        hasDeletedChildren: desktopMenuItem.children.length > 0,
        childrenCount: desktopMenuItem.children.length,
      };
    }

    // Supprimer l'élément du menu mobile s'il existe
    if (mobileMenuItem) {
      await this.prisma.mobileMenuItem.delete({ where: { id: mobileMenuItem.id } });
      results.mobile = {
        id: mobileMenuItem.id,
        deleted: true,
        hasDeletedChildren: mobileMenuItem.children.length > 0,
        childrenCount: mobileMenuItem.children.length,
      };
    }

    return results;
  });
}
}