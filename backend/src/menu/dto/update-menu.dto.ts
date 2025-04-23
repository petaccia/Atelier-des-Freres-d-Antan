import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuDto {
  @ApiProperty({ description: "Nom du menu", example: "main_menu", required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Indique si le menu est actif', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
