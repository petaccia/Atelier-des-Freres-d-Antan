import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateMenuItemDto } from '../dto/update-menu-item.dto';
import { MenuType } from '../dto/create-menu-item.dto';
import { DesktopMenuItem, MobileMenuItem } from '@prisma/client';

@Injectable()
export class MenuUpdateService {
  constructor(private prisma: PrismaService) {}

  async updateMenuItemInBothMenus(id: number, updateMenuItemDto: UpdateMenuItemDto) {
    // Vérifier si l'élément existe dans l'un des menus
    const desktopMenuItem = await this.prisma.desktopMenuItem.findUnique({
      where: { id },
    });

    const mobileMenuItem = await this.prisma.mobileMenuItem.findUnique({
      where: { id },
    });

    if (!desktopMenuItem && !mobileMenuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found in any menu`);
    }

    // Si le chemin est modifié, vérifier qu'il n'existe pas déjà
    if (updateMenuItemDto.path) {
      const existingDesktopPath = await this.prisma.desktopMenuItem.findFirst({
        where: {
          path: updateMenuItemDto.path,
          id: { not: id }
        }
      });

      const existingMobilePath = await this.prisma.mobileMenuItem.findFirst({
        where: {
          path: updateMenuItemDto.path,
          id: { not: id }
        }
      });

      if (existingDesktopPath || existingMobilePath) {
        throw new ConflictException(
          `Une page avec le chemin "${updateMenuItemDto.path}" existe déjà dans le menu`
        );
      }
    }

    // S'assurer que menuType n'est pas undefined
    const menuType = updateMenuItemDto.menuType ||
                    (desktopMenuItem && mobileMenuItem ? MenuType.BOTH :
                     desktopMenuItem ? MenuType.DESKTOP : MenuType.MOBILE);

    // Validation du parent si nécessaire
    if (updateMenuItemDto.parentId !== undefined) {
      if (desktopMenuItem && (menuType === MenuType.DESKTOP || menuType === MenuType.BOTH)) {
        await this.validateParentUpdate('desktop', id, updateMenuItemDto.parentId);
      }

      if (mobileMenuItem && (menuType === MenuType.MOBILE || menuType === MenuType.BOTH)) {
        await this.validateParentUpdate('mobile', id, updateMenuItemDto.parentId);
      }
    }

    try {
      let updatedDesktopItem: DesktopMenuItem | null = null;
      let updatedMobileItem: MobileMenuItem | null = null;

      // Mise à jour de l'élément dans le menu desktop
      if (desktopMenuItem && (menuType === MenuType.DESKTOP || menuType === MenuType.BOTH)) {
        updatedDesktopItem = await this.prisma.desktopMenuItem.update({
          where: { id },
          data: {
            title: updateMenuItemDto.title,
            path: updateMenuItemDto.path,
            parentId: updateMenuItemDto.parentId,
            isActive: updateMenuItemDto.isActive,
            order: updateMenuItemDto.order,
            icon: updateMenuItemDto.icon,
            showIcon: updateMenuItemDto.showIcon,
          },
        });
      }

      // Mise à jour de l'élément dans le menu mobile
      if (mobileMenuItem && (menuType === MenuType.MOBILE || menuType === MenuType.BOTH)) {
        updatedMobileItem = await this.prisma.mobileMenuItem.update({
          where: { id },
          data: {
            title: updateMenuItemDto.title,
            path: updateMenuItemDto.path,
            parentId: updateMenuItemDto.parentId,
            isActive: updateMenuItemDto.isActive,
            order: updateMenuItemDto.order,
            icon: updateMenuItemDto.icon,
            showIcon: updateMenuItemDto.showIcon,
          },
        });
      }

      return {
        desktop: updatedDesktopItem,
        mobile: updatedMobileItem,
      };

    } catch (error) {
      throw error;
    }
  }

  private async validateParentUpdate(type: 'desktop' | 'mobile', itemId: number, parentId: number | null): Promise<void> {
    // Si parentId est null, pas besoin de validation
    if (parentId === null) {
      return;
    }

    // Vérifier si le parent existe
    const parentExists = await (type === 'desktop'
      ? this.prisma.desktopMenuItem.findUnique({ where: { id: parentId } })
      : this.prisma.mobileMenuItem.findUnique({ where: { id: parentId } }));

    if (!parentExists) {
      throw new NotFoundException(`Parent menu item with ID ${parentId} not found`);
    }

    // Vérifier que le parent n'est pas l'élément lui-même
    if (parentId === itemId) {
      throw new ConflictException('Un élément de menu ne peut pas être son propre parent');
    }

    // Vérifier que le parent n'est pas un descendant de l'élément (pour éviter les cycles)
    const isDescendant = await this.isDescendant(type, parentId, itemId);
    if (isDescendant) {
      throw new ConflictException('Un élément de menu ne peut pas avoir un de ses descendants comme parent');
    }
  }

  private async isDescendant(type: 'desktop' | 'mobile', itemId: number, potentialAncestorId: number): Promise<boolean> {
    let item: { parentId: number | null } | null = null;

    if (type === 'desktop') {
      item = await this.prisma.desktopMenuItem.findUnique({
        where: { id: itemId },
        select: { parentId: true },
      });
    } else {
      item = await this.prisma.mobileMenuItem.findUnique({
        where: { id: itemId },
        select: { parentId: true },
      });
    }

    if (!item || item.parentId === null) {
      return false;
    }

    if (item.parentId === potentialAncestorId) {
      return true;
    }

    return this.isDescendant(type, item.parentId, potentialAncestorId);
  }
}
