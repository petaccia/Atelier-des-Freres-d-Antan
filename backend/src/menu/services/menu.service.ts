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

    // S'assurer que menuType n'est pas undefined
    const menuType = createMenuItemDto.menuType || MenuType.BOTH;

    // Validation du parent si nécessaire
    if (createMenuItemDto.parentId) {
      const parentExists = await this.validateParentExists(createMenuItemDto.parentId, menuType);
      if (!parentExists) {
        throw new NotFoundException(`Parent menu item with ID ${createMenuItemDto.parentId} not found`);
      }
    }

    const menuId = mainMenu.id;
    const parentId = createMenuItemDto.parentId ? Number(createMenuItemDto.parentId) : null;

    try {
      let desktopItem: DesktopMenuItem | undefined;
      let mobileItem: MobileMenuItem | undefined;

      if (menuType === MenuType.DESKTOP || menuType === MenuType.BOTH) {
        desktopItem = await this.prisma.desktopMenuItem.create({
          data: {
            menuId,
            title: createMenuItemDto.title,
            path: createMenuItemDto.path,
            parentId,
            isActive: createMenuItemDto.isActive ?? true,
            order: createMenuItemDto.order ?? await this.calculateOrder('desktop', menuId, parentId),
            icon: createMenuItemDto.icon || null,
            showIcon: createMenuItemDto.showIcon ?? false,
          },
        });
      }

      if (menuType === MenuType.MOBILE || menuType === MenuType.BOTH) {
        mobileItem = await this.prisma.mobileMenuItem.create({
          data: {
            menuId,
            title: createMenuItemDto.title,
            path: createMenuItemDto.path,
            parentId,
            isActive: createMenuItemDto.isActive ?? true,
            order: createMenuItemDto.order ?? await this.calculateOrder('mobile', menuId, parentId),
            icon: createMenuItemDto.icon || null,
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

  private async calculateOrder(type: 'desktop' | 'mobile', menuId: number, parentId: number | null): Promise<number> {
    const model = type === 'desktop' ? this.prisma.desktopMenuItem : this.prisma.mobileMenuItem;
    
    const lastItem = await (type === 'desktop' ? 
      this.prisma.desktopMenuItem.findFirst({
        where: {
          menuId,
          parentId: parentId || null,
        },
        orderBy: {
          order: 'desc',
        },
      }) :
      this.prisma.mobileMenuItem.findFirst({
        where: {
          menuId,
          parentId: parentId || null,
        },
        orderBy: {
          order: 'desc',
        },
      })
    );

    return lastItem ? lastItem.order + 1 : 0;
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
}
