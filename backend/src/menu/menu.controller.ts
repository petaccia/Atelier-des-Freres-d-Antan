import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, ParseIntPipe, HttpCode } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { MenuService } from './menu.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('main')
  @UseInterceptors(CacheInterceptor)
  async getMainMenu() {
    return this.menuService.getMainMenu();
  }

  @Get('items/:id')
  async getMenuItem(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.getMenuItem(id);
  }

  @Post('items')
  async createMenuItem(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuService.createMenuItem(createMenuItemDto);
  }

  @Put('items/:id')
  async updateMenuItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    return this.menuService.updateMenuItem(id, updateMenuItemDto);
  }

  @Delete('items/:id')
  @HttpCode(200)
  async deleteMenuItem(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.deleteMenuItem(id);
  }
}