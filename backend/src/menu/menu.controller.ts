import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { MenuService } from './menu.service';

@Controller('api/menu')
@UseInterceptors(CacheInterceptor)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('main')
  async getMainMenu() {
    return this.menuService.getMainMenu();
  }
}