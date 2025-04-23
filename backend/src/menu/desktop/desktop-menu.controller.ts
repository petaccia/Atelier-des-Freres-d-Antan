import { Controller, Get, Param, Post, Put, Delete, Body, ParseIntPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { DesktopMenuService } from "./services/desktop-menu.service";
import { CreateDesktopMenuItemDto } from "./dto/create-desktopMenu-item.dto";
import { UpdateDesktopMenuItemDto } from "./dto/update-desktopMenu-item.dto";

@ApiTags('desktop-menu')
@Controller('desktop-menu')
export class DesktopMenuController {
  constructor(private readonly desktopMenuService: DesktopMenuService ) {}

  @Get(':title')
  @ApiOperation({ summary: 'Récupérer le menu desktop' })
  findOne(@Param('title') title: string) {
    return this.desktopMenuService.findOne(title);
  }

  @Get('main')
  async getDesktopMenu() {
    return this.desktopMenuService.getDesktopMenu();
  }

  @Get('items/:id')
  async getDesktopMenuItem(@Param('id', ParseIntPipe) id: number) {
    return this.desktopMenuService.getDesktopMenuItem(id);
  }

  @Get('items')
  async getDesktopMenuItems() {
    return this.desktopMenuService.getDesktopMenuItems();
  }

  @Get('items/:id/children')
  async getDesktopMenuItemChildren(@Param('id', ParseIntPipe) id: number) {
    return this.desktopMenuService.getDesktopMenuItemChildren(id);
  }

  @Get('items/:id/parent')
  async getDesktopMenuItemParent(@Param('id', ParseIntPipe) id: number) {
    return this.desktopMenuService.getDesktopMenuItemParent(id);
  }

  @Post('items')
  async createDesktopMenuItem(@Body() createMenuItemDto: CreateDesktopMenuItemDto) {
    return this.desktopMenuService.createDesktopMenuItem(createMenuItemDto);
  }

  @Put('items/:id')
  async updateDesktopMenuItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMenuItemDto: UpdateDesktopMenuItemDto
  ) {
    return this.desktopMenuService.updateDesktopMenuItem(id, updateMenuItemDto);
  }

  @Delete('items/:id')
  async deleteDesktopMenuItem(@Param('id', ParseIntPipe) id: number) {
    return this.desktopMenuService.deleteDesktopMenuItem(id);
  }
}