import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMenuDto } from '../dto/create-menu.dto';
import { UpdateMenuDto } from '../dto/update-menu.dto';
import { CreateMenuItemDto } from '../dto/create-menu-item.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDto) {
    return this.prisma.menu.create({
      data: {
        name: createMenuDto.name,
        isActive: createMenuDto.isActive !== undefined ? createMenuDto.isActive : true,
      },
    });
  }

  async findAll() {
    return this.prisma.menu.findMany();
  }

  async findOne(name: string) {
    const menu = await this.prisma.menu.findUnique({
      where: { name },
    });

    if (!menu) {
      throw new NotFoundException(`Menu with name ${name} not found`);
    }

    return menu;
  }

  async update(name: string, updateMenuDto: UpdateMenuDto) {
    const menu = await this.prisma.menu.findUnique({
      where: { name },
    });

    if (!menu) {
      throw new NotFoundException(`Menu with name ${name} not found`);
    }

    return this.prisma.menu.update({
      where: { name },
      data: {
        name: updateMenuDto.name,
        isActive: updateMenuDto.isActive,
      },
    });
  }

  async remove(name: string) {
    const menu = await this.prisma.menu.findUnique({
      where: { name },
    });

    if (!menu) {
      throw new NotFoundException(`Menu with name ${name} not found`);
    }

    return this.prisma.menu.delete({
      where: { name },
    });
  }

  async createMenuItemInBothMenus(createMenuItemDto: CreateMenuItemDto) {
    const mainMenu = await this.prisma.menu.findFirst({
      where: { name: 'main_menu' },
    });

    if (!mainMenu) {
      throw new Error('Menu principal non trouvé');
    }

    const menuId = mainMenu.id;

    try {
      // Création dans le menu desktop
      const desktopItem = await this.prisma.desktopMenuItem.create({
        data: {
          menuId,
          title: createMenuItemDto.title,
          path: createMenuItemDto.path,
          parentId: createMenuItemDto.parentId,
          isActive: createMenuItemDto.isActive,
        },
      });

      // Création dans le menu mobile
      const mobileItem = await this.prisma.mobileMenuItem.create({
        data: {
          menuId,
          title: createMenuItemDto.title,
          path: createMenuItemDto.path,
          parentId: createMenuItemDto.parentId,
          isActive: createMenuItemDto.isActive,
          showIcon: createMenuItemDto.showIcon,
        },
      });

      return {
        desktop: desktopItem,
        mobile: mobileItem,
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
