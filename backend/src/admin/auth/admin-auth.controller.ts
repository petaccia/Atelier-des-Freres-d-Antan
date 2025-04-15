import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AdminAuthService } from './admin-auth-service';
import { AdminAuthDto } from './dto';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {} 

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authDto: AdminAuthDto) {
    const admin = await this.adminAuthService.validateAdmin(authDto);
    return {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    }
  }
}