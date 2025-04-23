import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { MobileMenuService } from "./services/mobile-menu.service";

@ApiTags('mobile-menu')
@Controller('mobile-menu')
export class MobileMenuController {
  constructor(private readonly mobileMenuService: MobileMenuService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer le menu mobile complet' })
  async getMobileMenu() {
    return this.mobileMenuService.getMobileMenu();
  }

  @Get('items')
  @ApiOperation({ summary: 'Récupérer tous les items du menu desktop' })
  async getMobileMenuItems() {
    return this.mobileMenuService.getMobileMenuItems();
  }
}
