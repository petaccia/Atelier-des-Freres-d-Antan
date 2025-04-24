import { IsString, IsOptional, IsInt, Min, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDesktopMenuItemDto {
  @ApiProperty({ description: "Titre de l'élément de menu", required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: "Chemin de l'élément de menu", required: false })
  @IsString()
  @IsOptional()
  path?: string;

  @ApiProperty({ description: "Ordre d'affichage de l'élément de menu", required: false })
  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;

  @ApiProperty({ description: "ID du parent (pour les sous-menus)", required: false })
  @IsInt()
  @IsOptional()
  parentId?: number;

  @ApiProperty({ description: "Indique si l'élément est actif", required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
