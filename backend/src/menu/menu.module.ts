import { Module } from '@nestjs/common';
import { MenuCreateController } from './menu-create.controller';
import { MenuCreateService } from './services/menu-create.service';
import { PrismaService } from '../../prisma/prisma.service';
import { DesktopMenuController } from './desktop/desktop-menu.controller';
import { MobileMenuController } from './mobile/mobile-menu.controller';
import { DesktopMenuService } from './desktop/services/desktop-menu.service';
import { MobileMenuService } from './mobile/services/mobile-menu.service';
import { MenuDeleteService } from './services/menu-delete.service';
import { MenuDeleteController } from './menu-delete.controller';

@Module({
  controllers: [
    MenuCreateController, 
    MenuDeleteController , 
    DesktopMenuController, 
    MobileMenuController 
  ],
  providers: [
    MenuCreateService, 
    MenuDeleteService, 
    PrismaService, 
    DesktopMenuService, 
    MobileMenuService
  ],
  exports: [
    MenuCreateService, 
    MenuDeleteService, 
    DesktopMenuService, 
    MobileMenuService

  ],
})
export class MenuModule {}
