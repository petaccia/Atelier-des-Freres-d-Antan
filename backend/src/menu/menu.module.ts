import { Module} from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { MenuController } from './menu.controller';
import { MenuService } from './services/menu.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { DesktopMenuController } from './desktop/desktop-menu.controller';
import { MobileMenuController } from './mobile/mobile-menu.controller';
import { DesktopMenuService } from './desktop/services/desktop-menu.service';
import { MobileMenuService } from './mobile/services/mobile-menu.service';

@Module({
  imports: [
    PrismaModule,
    CacheModule.register({
      ttl: 60 * 60, // 1 heure de cache
    }),
  ],
  controllers: [MenuController, DesktopMenuController, MobileMenuController],
  providers: [MenuService, DesktopMenuService, MobileMenuService],
  exports: [MenuService, DesktopMenuService, MobileMenuService],
})
export class MenuModule {}