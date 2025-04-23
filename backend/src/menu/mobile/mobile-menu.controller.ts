import { Controller, Get, Param, Post, Put, Delete, Body, ParseIntPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { MobileMenuService } from "./services/mobile-menu.service";
import { CreateMobileMenuItemDto } from "./dto/create-mobileMenu-item.dto";
import { UpdateMobileMenuItemDto } from "./dto/update-mobileMenu-item-dto";

@ApiTags('mobile-menu')
@Controller('mobile-menu')
export class MobileMenuController {
  constructor(private readonly mobileMenuService: MobileMenuService ) {}

  @Get(':title')
  @ApiOperation({ summary: 'Récupérer le menu mobile' })
  findOne(@Param('title') title: string) {
    return this.mobileMenuService.findOne(title);
  }

  @Get('main')
  async getMobileMenu() {
    return this.mobileMenuService.getMobileMenu();
  }

  @Get('items/:id')
  async getMobileMenuItem(@Param('id', ParseIntPipe) id: number) {
    return this.mobileMenuService.getMobileMenuItem(id);
  }

  @Get('items')
  async getMobileMenuItems() {
    return this.mobileMenuService.getMobileMenuItems();
  }

  @Get('items/:id/children')
  async getMobileMenuItemChildren(@Param('id', ParseIntPipe) id: number) {
    return this.mobileMenuService.getMobileMenuItemChildren(id);
  }

  @Get('items/:id/parent')
  async getMobileMenuItemParent(@Param('id', ParseIntPipe) id: number) {
    return this.mobileMenuService.getMobileMenuItemParent(id);
  }

  @Post('items')
  async createMobileMenuItem(@Body() createMenuItemDto: CreateMobileMenuItemDto) {
    return this.mobileMenuService.createMobileMenuItem(createMenuItemDto);
  }

  @Put('items/:id')
  async updateMobileMenuItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMenuItemDto: UpdateMobileMenuItemDto
  ) {
    return this.mobileMenuService.updateMobileMenuItem(id, updateMenuItemDto);
  }

  @Delete('items/:id')
  async deleteMobileMenuItem(@Param('id', ParseIntPipe) id: number) {
    return this.mobileMenuService.deleteMobileMenuItem(id);
  }
}