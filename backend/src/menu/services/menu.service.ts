import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMenuDto } from '../dto/create-menu.dto';
import { UpdateMenuDto } from '../dto/update-menu.dto';

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
}
