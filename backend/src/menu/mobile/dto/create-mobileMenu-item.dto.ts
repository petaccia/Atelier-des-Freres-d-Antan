import { IsString, IsOptional, IsInt, Min, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMobileMenuItemDto {
  @ApiProperty({ description: "Titre de l'élément de menu", required: false })
  @IsString()
  title: string;

  @ApiProperty({ description: "Chemin de l'élément de menu", required: false })
  @IsString()
  @IsOptional()
  path?: string;

  @ApiProperty({ description: "Ordre d'affichage de l'élément de menu", required: false, default: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;

  @ApiProperty({ description: "ID du parent (pour les sous-menus)", required: false })
  @IsInt()
  @IsOptional()
  parentId?: number;

  @ApiProperty({ description: "Indique si l'élément est actif", required: false, default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ description: "Indique si l'icône doit être affichée", required: false, default: true })
  @IsBoolean()
  @IsOptional()
  showIcon?: boolean;
}
