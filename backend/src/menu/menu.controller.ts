import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { MenuService } from './services/menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('menus')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les menus' })
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':name')
  @ApiOperation({ summary: 'Récupérer un menu par son nom' })
  @ApiParam({ name: 'name', description: 'Nom du menu', example: 'main_menu' })
  findOne(@Param('name') name: string) {
    return this.menuService.findOne(name);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau menu' })
  @ApiBody({ type: CreateMenuDto })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Put(':name')
  @ApiOperation({ summary: 'Mettre à jour un menu par son nom' })
  @ApiParam({ name: 'name', description: 'Nom du menu', example: 'main_menu' })
  @ApiBody({ type: UpdateMenuDto })
  update(@Param('name') name: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(name, updateMenuDto);
  }

  @Delete(':name')
  @HttpCode(204)
  @ApiOperation({ summary: 'Supprimer un menu par son nom' })
  @ApiParam({ name: 'name', description: 'Nom du menu', example: 'main_menu' })
  remove(@Param('name') name: string) {
    return this.menuService.remove(name);
  }
}
