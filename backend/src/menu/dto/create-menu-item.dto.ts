import { IsString, IsBoolean, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMenuItemDto {
  @ApiProperty({ description: 'Titre de la page' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Chemin de la page' })
  @IsString()
  path: string;

  @ApiPropertyOptional({ description: 'ID du parent (si sous-menu)' })
  @IsOptional()
  @IsInt()
  parentId?: number;

  @ApiPropertyOptional({ description: 'Afficher une icône' })
  @IsOptional()
  @IsBoolean()
  showIcon?: boolean;

  @ApiPropertyOptional({ description: 'Page active' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}