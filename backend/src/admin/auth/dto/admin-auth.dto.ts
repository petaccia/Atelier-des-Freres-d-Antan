import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminAuthDto {
  @ApiProperty({
    description: 'Nom d\'utilisateur de l\'administrateur',
    example: 'admin',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Mot de passe de l\'administrateur',
    example: 'password123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
