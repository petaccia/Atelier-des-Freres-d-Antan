import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
// Utiliser les DTOs génériques pour le moment
import { CreateDesktopMenuItemDto } from "../dto/create-desktopMenu-item.dto";
import { UpdateDesktopMenuItemDto } from "../dto/update-desktopMenu-item.dto";

@Injectable()
export class DesktopMenuService {
  constructor(private prisma: PrismaService) {}

  async getDesktopMenu() {
    const menu = await this.prisma.menu.findFirst({
      where: { 
        name: 'main_menu',
        isActive: true 
      },
      include: {
        desktopMenuItems: {
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

    if (!menu) {
      throw new NotFoundException('Desktop menu not found');
    }

    return menu;
  }

  async getDesktopMenuItem(id: number) {
    const menuItem = await this.prisma.desktopMenuItem.findUnique({
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

  async getDesktopMenuItems() {
    return this.prisma.desktopMenuItem.findMany({
      orderBy: { order: 'asc' },
      include: {
        children: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async getDesktopMenuItemChildren(id: number) {
    const menuItem = await this.prisma.desktopMenuItem.findUnique({
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

  async getDesktopMenuItemParent(id: number) {
    const menuItem = await this.prisma.desktopMenuItem.findUnique({
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

  async createDesktopMenuItem(createMenuItemDto: CreateDesktopMenuItemDto) {
    const menu = await this.prisma.menu.findFirst({
      where: { name: 'main_menu' },
    });

    if (!menu) {
      throw new NotFoundException('Main menu not found');
    }

    if (createMenuItemDto.parentId) {
      const parentExists = await this.prisma.desktopMenuItem.findUnique({
        where: { id: createMenuItemDto.parentId },
      });

      if (!parentExists) {
        throw new NotFoundException(`Parent menu item with ID ${createMenuItemDto.parentId} not found`);
      }
    }

    const order = await this.calculateOrder(menu.id, createMenuItemDto.parentId ?? null);

    return this.prisma.desktopMenuItem.create({
      data: {
        menuId: menu.id,
        title: createMenuItemDto.title,
        path: createMenuItemDto.path || '/',
        order,
        isActive: createMenuItemDto.isActive !== undefined ? createMenuItemDto.isActive : true,
        parentId: createMenuItemDto.parentId || null,
      },
    });
  }

  private async calculateOrder(menuId: number, parentId: number | null): Promise<number> {
    const lastItem = await this.prisma.desktopMenuItem.findFirst({
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

  async updateDesktopMenuItem(id: number, updateMenuItemDto: UpdateDesktopMenuItemDto) {
    const existingMenuItem = await this.prisma.desktopMenuItem.findUnique({
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

    return this.prisma.desktopMenuItem.update({
      where: { id },
      data: {
        title: updateMenuItemDto.title,
        path: updateMenuItemDto.path,
        order: updateMenuItemDto.order,
        isActive: updateMenuItemDto.isActive,
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
      const parentExists = await this.prisma.desktopMenuItem.findUnique({
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
    const menuItem = await this.prisma.desktopMenuItem.findUnique({
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

  async deleteDesktopMenuItem(id: number) {
    const menuItem = await this.prisma.desktopMenuItem.findUnique({
      where: { id },
      include: { children: true },
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    await this.prisma.desktopMenuItem.delete({ where: { id } });

    return {
      id,
      deleted: true,
      hasDeletedChildren: menuItem.children.length > 0,
      childrenCount: menuItem.children.length,
    };
  }

  async findOne(title: string) {
    const menuItem = await this.prisma.desktopMenuItem.findFirst({
      where: { title },
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with title ${title} not found`);
    }

    return menuItem;
  }
}
