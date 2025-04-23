import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { DesktopMenuService } from "./services/desktop-menu.service";

@ApiTags('desktop-menu')
@Controller('desktop-menu')
export class DesktopMenuController {
  constructor(private readonly desktopMenuService: DesktopMenuService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer le menu desktop complet' })
  async getDesktopMenu() {
    return this.desktopMenuService.getDesktopMenu();
  }

  @Get('items')
  @ApiOperation({ summary: 'Récupérer tous les items du menu desktop' })
  async getDesktopMenuItems() {
    return this.desktopMenuService.getDesktopMenuItems();
  }
}
