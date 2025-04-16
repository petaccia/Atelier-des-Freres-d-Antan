import { Module} from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    CacheModule.register({
      ttl: 60 * 60, // 1 heure de cache
    }),
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}