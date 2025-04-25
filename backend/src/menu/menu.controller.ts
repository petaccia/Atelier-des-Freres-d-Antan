import { Controller, Post, Body, UseGuards, UnauthorizedException, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
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
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 409, description: 'Conflit - Chemin déjà existant' })
  @ApiResponse({ status: 500, description: 'Erreur serveur' })
  async createMenuItem(@Body() createMenuItemDto: CreateMenuItemDto) {
    try {
      const result = await this.menuService.createMenuItemInBothMenus(createMenuItemDto);
      return result;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Erreur lors de la création du menu',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
