import { Controller, Put, Param, Body, UseGuards, UnauthorizedException, NotFoundException, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../admin/auth/jwt-auth.guard';
import { MenuUpdateService } from './services/menu-update.service';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@ApiTags('Menu')
@Controller('menu')
@UseGuards(JwtAuthGuard)
export class MenuUpdateController {
  constructor(private readonly menuUpdateService: MenuUpdateService) {}

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un élément de menu' })
  @ApiParam({ name: 'id', description: 'ID de l\'élément de menu à mettre à jour' })
  @ApiResponse({ status: 200, description: 'Élément de menu mis à jour avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Élément de menu non trouvé' })
  @ApiResponse({ status: 409, description: 'Conflit - Chemin déjà existant ou relation parent-enfant invalide' })
  @ApiResponse({ status: 500, description: 'Erreur serveur' })
  async updateMenuItem(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto
  ) {
    try {
      const result = await this.menuUpdateService.updateMenuItemInBothMenus(
        Number(id),
        updateMenuItemDto
      );
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof ConflictException) {
        throw error;
      }
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Erreur lors de la mise à jour du menu',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
