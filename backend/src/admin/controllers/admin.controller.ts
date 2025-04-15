import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard) // Protège toutes les routes du contrôleur
export class AdminController {
  @Get('profile')
  getProfile(@CurrentUser() user) {
    return user;
  }
}