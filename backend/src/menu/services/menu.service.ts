import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMenuItemDto, MenuType } from '../dto/create-menu-item.dto';
import { DesktopMenuItem, MobileMenuItem } from '@prisma/client';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async createMenuItemInBothMenus(createMenuItemDto: CreateMenuItemDto) {
    const mainMenu = await this.prisma.menu.findFirst({
      where: { name: 'main_menu' },
    });

    if (!mainMenu) {
      throw new Error('Menu principal non trouvé');
    }

    const menuId = mainMenu.id;

    try {
      let desktopItem: DesktopMenuItem | undefined;
      let mobileItem: MobileMenuItem | undefined;

      if (createMenuItemDto.menuType === MenuType.DESKTOP || createMenuItemDto.menuType === MenuType.BOTH) {
        desktopItem = await this.prisma.desktopMenuItem.create({
          data: {
            menuId,
            title: createMenuItemDto.title,
            path: createMenuItemDto.path,
            parentId: createMenuItemDto.parentId,
            isActive: createMenuItemDto.isActive,
            order: createMenuItemDto.order,
          },
        });
      }

      if (createMenuItemDto.menuType === MenuType.MOBILE || createMenuItemDto.menuType === MenuType.BOTH) {
        mobileItem = await this.prisma.mobileMenuItem.create({
          data: {
            menuId,
            title: createMenuItemDto.title,
            path: createMenuItemDto.path,
            parentId: createMenuItemDto.parentId,
            isActive: createMenuItemDto.isActive,
            order: createMenuItemDto.order,
            showIcon: false,
          },
        });
      }

      return {
        desktop: desktopItem || null,
        mobile: mobileItem || null,
      };

    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          `Une page avec le chemin "${createMenuItemDto.path}" existe déjà dans le menu`
        );
      }
      throw error;
    }
  }
}
