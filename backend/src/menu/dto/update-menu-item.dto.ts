import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber, IsEnum, Min } from 'class-validator';
import { MenuType } from './create-menu-item.dto';

export class UpdateMenuItemDto {
  @ApiProperty({ description: "Titre de l'élément de menu", required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: "Chemin de l'élément de menu", required: false })
  @IsString()
  @IsOptional()
  path?: string;

  @ApiProperty({ description: "Ordre d'affichage de l'élément de menu", required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  order?: number;

  @ApiProperty({ description: "ID du parent (pour les sous-menus)", required: false })
  @IsNumber()
  @IsOptional()
  parentId?: number;

  @ApiProperty({ description: "Indique si l'élément est actif", required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ 
    required: false,
    description: 'Icon name from React Icons library (e.g., "FaHome", "MdSettings")'
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  showIcon?: boolean;

  @ApiProperty({ enum: MenuType, required: false })
  @IsOptional()
  @IsEnum(MenuType)
  menuType?: MenuType;
}
