import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../admin/auth/jwt-auth.guard';
import { MenuService } from './services/menu.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';

@ApiTags('Menu')
@Controller('menu')
@UseGuards(JwtAuthGuard)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel item dans les menus desktop et mobile' })
  @ApiResponse({ status: 201, description: 'Items créés avec succès' })
  @ApiResponse({ status: 409, description: 'Conflit - Chemin déjà existant' })
  async createMenuItem(@Body() createMenuItemDto: CreateMenuItemDto) {
    return await this.menuService.createMenuItemInBothMenus(createMenuItemDto);
  }
}
