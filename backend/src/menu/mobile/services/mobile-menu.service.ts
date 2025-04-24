import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
// Utiliser les DTOs génériques pour le moment
import { CreateMobileMenuItemDto } from '../dto/create-mobileMenu-item.dto';
import { UpdateMobileMenuItemDto } from '../dto/update-mobileMenu-item-dto';

@Injectable()
export class MobileMenuService {
  constructor(private prisma: PrismaService) {}

  async getMobileMenu() {
    const menu = await this.prisma.menu.findFirst({
      where: { 
        name: 'main_menu',
        isActive: true 
      },
      include: {
        mobileMenuItems: {
          where: { parentId: null }, // Seulement les éléments racine
          orderBy: { order: 'asc' },
          include: {
            children: {
              orderBy: { order: 'asc' },
              include: {  // Ajout récursif pour les sous-niveaux
                children: {
                  orderBy: { order: 'asc' },
                }
              }
            },
          },
        },
      },
    });

    if (!menu) {
      throw new NotFoundException('Mobile menu not found');
    }

    return menu;
  }

  async getMobileMenuItem(id: number) {
    const menuItem = await this.prisma.mobileMenuItem.findUnique({
      where: { id },
      include: {
        children: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return menuItem;
  }

  async getMobileMenuItems() {
    return this.prisma.mobileMenuItem.findMany({
      orderBy: { order: 'asc' },
      include: {
        children: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async getMobileMenuItemChildren(id: number) {
    const menuItem = await this.prisma.mobileMenuItem.findUnique({
      where: { id },
      include: {
        children: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return menuItem.children;
  }

  async getMobileMenuItemParent(id: number) {
    const menuItem = await this.prisma.mobileMenuItem.findUnique({
      where: { id },
      include: {
        parent: true,
      },
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return menuItem.parent;
  }

  async createMobileMenuItem(createMenuItemDto: CreateMobileMenuItemDto) {
    const menu = await this.prisma.menu.findFirst({
      where: { name: 'main_menu' },
    });

    if (!menu) {
      throw new NotFoundException('Main menu not found');
    }

    if (createMenuItemDto.parentId) {
      const parentExists = await this.prisma.mobileMenuItem.findUnique({
        where: { id: createMenuItemDto.parentId },
      });

      if (!parentExists) {
        throw new NotFoundException(`Parent menu item with ID ${createMenuItemDto.parentId} not found`);
      }
    }

    const order = await this.calculateOrder(menu.id, createMenuItemDto.parentId ?? null);

    return this.prisma.mobileMenuItem.create({
      data: {
        menuId: menu.id,
        title: createMenuItemDto.title,
        path: createMenuItemDto.path || '/',
        order,
        isActive: createMenuItemDto.isActive !== undefined ? createMenuItemDto.isActive : true,
        showIcon: createMenuItemDto.showIcon !== undefined ? createMenuItemDto.showIcon : true,
        parentId: createMenuItemDto.parentId || null,
      },
    });
  }

  private async calculateOrder(menuId: number, parentId: number | null): Promise<number> {
    const lastItem = await this.prisma.mobileMenuItem.findFirst({
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

  async updateMobileMenuItem(id: number, updateMenuItemDto: UpdateMobileMenuItemDto) {
    const existingMenuItem = await this.prisma.mobileMenuItem.findUnique({
      where: { id },
    });

    if (!existingMenuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    // Si le parent change, valider le changement
    if (updateMenuItemDto.parentId !== undefined && 
        updateMenuItemDto.parentId !== existingMenuItem.parentId) {
      await this.validateParentUpdate(id, updateMenuItemDto.parentId);
    }

    return this.prisma.mobileMenuItem.update({
      where: { id },
      data: {
        title: updateMenuItemDto.title,
        path: updateMenuItemDto.path,
        order: updateMenuItemDto.order,
        isActive: updateMenuItemDto.isActive,
        showIcon: updateMenuItemDto.showIcon,
        parentId: updateMenuItemDto.parentId,
      },
    });
  }

  private async validateParentUpdate(id: number, newParentId: number | null) {
    // Vérifier que l'élément ne devient pas son propre parent
    if (newParentId === id) {
      throw new BadRequestException('A menu item cannot be its own parent');
    }

    if (newParentId !== null) {
      const parentExists = await this.prisma.mobileMenuItem.findUnique({
        where: { id: newParentId },
      });

      if (!parentExists) {
        throw new NotFoundException(`Parent menu item with ID ${newParentId} not found`);
      }

      // Vérifier que le nouveau parent n'est pas un descendant de l'élément
      const isDescendant = await this.isDescendant(newParentId, id);
      if (isDescendant) {
        throw new BadRequestException('Cannot set a descendant as parent');
      }
    }
  }

  private async isDescendant(potentialDescendant: number, ancestorId: number): Promise<boolean> {
    const menuItem = await this.prisma.mobileMenuItem.findUnique({
      where: { id: potentialDescendant },
      include: { children: true },
    });

    if (!menuItem) return false;
    if (menuItem.parentId === ancestorId) return true;

    // Vérifier récursivement les enfants
    for (const child of menuItem.children) {
      const isChildDescendant = await this.isDescendant(child.id, ancestorId);
      if (isChildDescendant) return true;
    }

    return false;
  }

  async deleteMobileMenuItem(id: number) {
    const menuItem = await this.prisma.mobileMenuItem.findUnique({
      where: { id },
      include: { children: true },
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    await this.prisma.mobileMenuItem.delete({ where: { id } });

    return {
      id,
      deleted: true,
      hasDeletedChildren: menuItem.children.length > 0,
      childrenCount: menuItem.children.length,
    };
  }

  async findOne(title: string) {
    const menuItem = await this.prisma.mobileMenuItem.findFirst({
      where: { title },
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with title ${title} not found`);
    }

    return menuItem;
  }
}
