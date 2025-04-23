import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({ description: "Nom du menu", example: "main_menu" })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Indique si le menu est actif', required: false, default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
