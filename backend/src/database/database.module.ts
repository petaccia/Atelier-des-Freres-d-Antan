import { Module } from '@nestjs/common';
import { SqlExecutorService } from './sql-executor.service';
import { AdminSqlService } from './admin-sql.service';
import { MenuSqlService } from './menu-sql.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SqlExecutorService, AdminSqlService, MenuSqlService],
  exports: [SqlExecutorService, AdminSqlService, MenuSqlService],
})
export class DatabaseModule {}
