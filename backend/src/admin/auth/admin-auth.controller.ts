import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminAuthService } from './admin-auth-service';
import { AdminAuthDto } from './dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Authentication')
@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authentification administrateur' })
  @ApiResponse({ status: 200, description: 'Authentification réussie' })
  @ApiResponse({ status: 401, description: 'Identifiants invalides' })
  async login(@Body() authDto: AdminAuthDto) {
    const { admin, access_token } = await this.adminAuthService.validateAdmin(authDto);
    return {
      id: admin.id,
      username: admin.username,
      access_token
    }
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rafraîchir un token JWT' })
  @ApiResponse({ status: 200, description: 'Token rafraîchi avec succès' })
  @ApiResponse({ status: 401, description: 'Token invalide ou expiré' })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.adminAuthService.refreshToken(refreshTokenDto);
  }
}