import { IsString, IsBoolean, IsOptional, IsInt, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MenuType {
  DESKTOP = "DESKTOP",
  MOBILE = "MOBILE",
  BOTH = "BOTH"
}

export class CreateMenuItemDto {
  @ApiProperty({ description: "Titre de l'élément de menu" })
  @IsString()
  title: string;

  @ApiProperty({ description: "Chemin de l'élément de menu" })
  @IsString()
  path: string;

  @ApiProperty({ description: "Ordre d'affichage", required: false })
  @IsInt()
  @IsOptional()
  order?: number;

  @ApiProperty({ description: "ID du parent", required: false })
  @IsInt()
  @IsOptional()
  parentId?: number;

  @ApiProperty({ description: "État actif/inactif", default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @ApiProperty({
    description: "Type de menu (DESKTOP, MOBILE, ou BOTH)",
    enum: MenuType,
    default: MenuType.BOTH
  })
  @IsEnum(MenuType)
  @IsOptional()
  menuType?: MenuType = MenuType.BOTH;
}
