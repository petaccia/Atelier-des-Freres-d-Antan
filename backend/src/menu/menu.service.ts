import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

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

  async getMenuItem(id: number) {
    const menuItem = await this.prisma.menuItem.findUnique({
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

  async createMenuItem(createMenuItemDto: CreateMenuItemDto) {
    // Vérifier si le menu principal existe
    const mainMenu = await this.prisma.menu.findFirst({
      where: { name: 'main_menu' },
    });

    if (!mainMenu) {
      throw new NotFoundException('Main menu not found');
    }

    // Vérifier si le parent existe (si spécifié)
    if (createMenuItemDto.parentId) {
      const parentExists = await this.prisma.menuItem.findUnique({
        where: { id: createMenuItemDto.parentId },
      });

      if (!parentExists) {
        throw new NotFoundException(`Parent menu item with ID ${createMenuItemDto.parentId} not found`);
      }
    }

    // Déterminer l'ordre si non spécifié
    if (createMenuItemDto.order === undefined) {
      const lastItem = await this.prisma.menuItem.findFirst({
        where: {
          menuId: mainMenu.id,
          parentId: createMenuItemDto.parentId || null,
        },
        orderBy: {
          order: 'desc',
        },
      });

      createMenuItemDto.order = lastItem ? lastItem.order + 1 : 0;
    }

    // Créer l'élément de menu
    const menuItem = await this.prisma.menuItem.create({
      data: {
        menuId: mainMenu.id,
        title: createMenuItemDto.title,
        path: createMenuItemDto.path || '/',
        order: createMenuItemDto.order,
        isActive: createMenuItemDto.isActive !== undefined ? createMenuItemDto.isActive : true,
        parentId: createMenuItemDto.parentId || null,
      },
    });

    return menuItem;
  }

  async updateMenuItem(id: number, updateMenuItemDto: UpdateMenuItemDto) {
    // Vérifier si l'élément de menu existe
    const existingMenuItem = await this.prisma.menuItem.findUnique({
      where: { id },
    });

    if (!existingMenuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    // Vérifier si le parent existe (si spécifié et différent)
    if (updateMenuItemDto.parentId !== undefined &&
        updateMenuItemDto.parentId !== existingMenuItem.parentId) {

      // Vérifier que l'élément ne devient pas son propre parent ou ancêtre
      if (updateMenuItemDto.parentId === id) {
        throw new BadRequestException('A menu item cannot be its own parent');
      }

      // Vérifier si le nouveau parent existe
      if (updateMenuItemDto.parentId !== null) {
        const parentExists = await this.prisma.menuItem.findUnique({
          where: { id: updateMenuItemDto.parentId },
        });

        if (!parentExists) {
          throw new NotFoundException(`Parent menu item with ID ${updateMenuItemDto.parentId} not found`);
        }

        // Vérifier que le nouveau parent n'est pas un descendant de l'élément
        const isDescendant = await this.isDescendant(updateMenuItemDto.parentId, id);
        if (isDescendant) {
          throw new BadRequestException('Cannot set a descendant as parent');
        }
      }
    }

    // Mettre à jour l'élément de menu
    const updatedMenuItem = await this.prisma.menuItem.update({
      where: { id },
      data: {
        title: updateMenuItemDto.title,
        path: updateMenuItemDto.path,
        order: updateMenuItemDto.order,
        isActive: updateMenuItemDto.isActive,
        parentId: updateMenuItemDto.parentId,
      },
    });

    return updatedMenuItem;
  }

  async deleteMenuItem(id: number) {
    // Vérifier si l'élément de menu existe
    const menuItem = await this.prisma.menuItem.findUnique({
      where: { id },
      include: {
        children: true,
      },
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    // Supprimer l'élément de menu (les enfants seront supprimés automatiquement grâce à la relation onDelete: Cascade)
    await this.prisma.menuItem.delete({
      where: { id },
    });

    return {
      id,
      deleted: true,
      hasDeletedChildren: menuItem.children.length > 0,
      childrenCount: menuItem.children.length,
    };
  }

  // Vérifie si potentialDescendant est un descendant de ancestorId
  private async isDescendant(potentialDescendant: number, ancestorId: number): Promise<boolean> {
    const menuItem = await this.prisma.menuItem.findUnique({
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
}
