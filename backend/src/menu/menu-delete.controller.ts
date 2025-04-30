import { Controller, Delete, Param, NotFoundException, UseGuards, UnauthorizedException, HttpStatus, HttpException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../admin/auth/jwt-auth.guard';
import { MenuDeleteService } from './services/menu-delete.service';

@ApiTags('Menu')
@Controller('menu')
@UseGuards(JwtAuthGuard)
export class MenuDeleteController {
  constructor(private readonly menuDeleteService: MenuDeleteService) {}

  @Delete(':path')
  @ApiOperation({ summary: 'Supprimer un item de menu' })
  @ApiResponse({ status: 200, description: 'Item de menu supprimé avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Item de menu non trouvé' })
  @ApiResponse({ status: 500, description: 'Erreur serveur' })
  async deleteMenuItem(@Param('path') path: string) {
    try {
      const result = await this.menuDeleteService.deleteMenuItemFromBothMenus(path);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Erreur lors de la suppression du menu',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
