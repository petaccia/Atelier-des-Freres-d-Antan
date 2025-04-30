import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber, IsEnum } from 'class-validator';

export enum MenuType {
  DESKTOP = 'DESKTOP',
  MOBILE = 'MOBILE',
  BOTH = 'BOTH',
}

export class DeleteMenuItemDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  path: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  parentId?: number;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ 
    required: false,
    description: 'Icon name from React Icons library (e.g., "FaHome", "MdSettings")'
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  showIcon?: boolean;

  @ApiProperty({ enum: MenuType, default: MenuType.BOTH })
  @IsOptional()
  @IsEnum(MenuType)
  menuType?: MenuType = MenuType.BOTH;
}
