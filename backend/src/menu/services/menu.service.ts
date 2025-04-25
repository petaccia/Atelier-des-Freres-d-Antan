import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
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
      throw new NotFoundException('Menu principal non trouvé');
    }

    // Vérifier si le chemin existe déjà
    const existingDesktopPath = await this.prisma.desktopMenuItem.findFirst({
      where: { path: createMenuItemDto.path }
    });

    const existingMobilePath = await this.prisma.mobileMenuItem.findFirst({
      where: { path: createMenuItemDto.path }
    });

    if (existingDesktopPath || existingMobilePath) {
      throw new ConflictException(
        `Une page avec le chemin "${createMenuItemDto.path}" existe déjà dans le menu`
      );
    }

    // Vérifier le parent si spécifié
    if (createMenuItemDto.parentId) {
      const parentExists = await this.validateParentExists(createMenuItemDto.parentId, createMenuItemDto.menuType);
      if (!parentExists) {
        throw new NotFoundException(`Parent menu item avec l'ID ${createMenuItemDto.parentId} non trouvé`);
      }
    }

    const menuId = mainMenu.id;
    const parentId = createMenuItemDto.parentId ? Number(createMenuItemDto.parentId) : null;

    try {
      let desktopItem: DesktopMenuItem | undefined;
      let mobileItem: MobileMenuItem | undefined;

      if (createMenuItemDto.menuType === MenuType.DESKTOP || createMenuItemDto.menuType === MenuType.BOTH) {
        desktopItem = await this.prisma.desktopMenuItem.create({
          data: {
            menuId,
            title: createMenuItemDto.title,
            path: createMenuItemDto.path,
            parentId,
            isActive: createMenuItemDto.isActive ?? true,
            order: createMenuItemDto.order ?? await this.calculateOrder('desktop', menuId, parentId),
          },
        });
      }

      if (createMenuItemDto.menuType === MenuType.MOBILE || createMenuItemDto.menuType === MenuType.BOTH) {
        mobileItem = await this.prisma.mobileMenuItem.create({
          data: {
            menuId,
            title: createMenuItemDto.title,
            path: createMenuItemDto.path,
            parentId,
            isActive: createMenuItemDto.isActive ?? true,
            order: createMenuItemDto.order ?? await this.calculateOrder('mobile', menuId, parentId),
            showIcon: createMenuItemDto.showIcon ?? false,
          },
        });
      }

      return {
        desktop: desktopItem || null,
        mobile: mobileItem || null,
      };

    } catch (error) {
      throw error;
    }
  }

  private async validateParentExists(parentId: number, menuType: MenuType): Promise<boolean> {
    if (menuType === MenuType.DESKTOP || menuType === MenuType.BOTH) {
      const desktopParent = await this.prisma.desktopMenuItem.findUnique({
        where: { id: parentId },
      });
      if (!desktopParent) return false;
    }

    if (menuType === MenuType.MOBILE || menuType === MenuType.BOTH) {
      const mobileParent = await this.prisma.mobileMenuItem.findUnique({
        where: { id: parentId },
      });
      if (!mobileParent) return false;
    }

    return true;
  }

  private async calculateOrder(type: 'desktop' | 'mobile', menuId: number, parentId: number | null): Promise<number> {
    const model = type === 'desktop' ? this.prisma.desktopMenuItem : this.prisma.mobileMenuItem;
    const lastItem = await model.findFirst({
      where: {
        menuId,
        parentId: parentId || null,
      },
      orderBy: {
        order: 'desc',
      },
    });

    return lastItem ? lastItem.order + 1 : 0;
  }
}
