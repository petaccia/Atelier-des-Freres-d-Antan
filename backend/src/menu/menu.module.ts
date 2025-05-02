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
import { MenuUpdateService } from './services/menu-update.service';
import { MenuUpdateController } from './menu-update.controller';

@Module({
  controllers: [
    MenuCreateController,
    MenuDeleteController,
    MenuUpdateController,
    DesktopMenuController,
    MobileMenuController
  ],
  providers: [
    MenuCreateService,
    MenuDeleteService,
    MenuUpdateService,
    PrismaService,
    DesktopMenuService,
    MobileMenuService
  ],
  exports: [
    MenuCreateService,
    MenuDeleteService,
    MenuUpdateService,
    DesktopMenuService,
    MobileMenuService
  ],
})
export class MenuModule {}
