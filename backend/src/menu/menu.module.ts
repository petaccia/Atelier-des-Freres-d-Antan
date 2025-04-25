import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './services/menu.service';
import { PrismaService } from '../../prisma/prisma.service';
import { DesktopMenuController } from './desktop/desktop-menu.controller';
import { MobileMenuController } from './mobile/mobile-menu.controller';
import { DesktopMenuService } from './desktop/services/desktop-menu.service';
import { MobileMenuService } from './mobile/services/mobile-menu.service';

@Module({
  controllers: [MenuController, DesktopMenuController, MobileMenuController ],
  providers: [MenuService, PrismaService, DesktopMenuService, MobileMenuService],
  exports: [MenuService, DesktopMenuService, MobileMenuService],
})
export class MenuModule {}
