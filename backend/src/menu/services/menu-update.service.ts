import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateMenuItemDto } from '../dto/update-menu-item.dto';
import { MenuType } from '../dto/create-menu-item.dto';
import { DesktopMenuItem, MobileMenuItem } from '@prisma/client';

// Type pour les données de mise à jour
type UpdateData = {
  title?: string;
  isActive?: boolean;
  order?: number;
  icon?: string | null;
  showIcon?: boolean;
  parentId?: number | null;
};

@Injectable()
export class MenuUpdateService {
  constructor(private prisma: PrismaService) {}

  async updateMenuItemInBothMenus(id: number, updateMenuItemDto: UpdateMenuItemDto) {
    console.log('Mise à jour de l\'élément de menu avec ID:', id);
    console.log('Données reçues:', updateMenuItemDto);

    // Vérifier si l'élément existe dans l'un des menus
    const desktopMenuItem = await this.prisma.desktopMenuItem.findUnique({
      where: { id },
    });

    const mobileMenuItem = await this.prisma.mobileMenuItem.findUnique({
      where: { id },
    });

    if (!desktopMenuItem && !mobileMenuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found in any menu`);
    }

    console.log('Élément trouvé:', {
      desktopExists: !!desktopMenuItem,
      mobileExists: !!mobileMenuItem
    });

    // Nous ne permettons pas la modification du chemin
    // Le frontend ne devrait pas envoyer le champ path
    if (updateMenuItemDto.path) {
      console.warn('Tentative de modification du chemin détectée. Ce champ sera ignoré.');
    }

    // Déterminer le type de menu actuel
    const currentMenuType = desktopMenuItem && mobileMenuItem ? MenuType.BOTH :
                           desktopMenuItem ? MenuType.DESKTOP : MenuType.MOBILE;

    // Utiliser le type spécifié dans la requête ou conserver le type actuel
    const menuType = updateMenuItemDto.menuType || currentMenuType;

    console.log('Type de menu:', { current: currentMenuType, requested: menuType });

    // Vérifier si le type de menu a changé
    const menuTypeChanged = updateMenuItemDto.menuType && updateMenuItemDto.menuType !== currentMenuType;
    console.log('Le type de menu a changé:', menuTypeChanged);

    // Validation du parent si nécessaire
    if (updateMenuItemDto.parentId !== undefined) {
      // Convertir les valeurs vides en null
      const parentIdValue = updateMenuItemDto.parentId as any;
      if (parentIdValue === '' || parentIdValue === 0 || !parentIdValue) {
        updateMenuItemDto.parentId = null as any;
      }

      if (desktopMenuItem && (menuType === MenuType.DESKTOP || menuType === MenuType.BOTH)) {
        await this.validateParentUpdate('desktop', id, updateMenuItemDto.parentId as number | null);
      }

      if (mobileMenuItem && (menuType === MenuType.MOBILE || menuType === MenuType.BOTH)) {
        await this.validateParentUpdate('mobile', id, updateMenuItemDto.parentId as number | null);
      }
    }

    try {
      let updatedDesktopItem: DesktopMenuItem | null = null;
      let updatedMobileItem: MobileMenuItem | null = null;

      // Préparer les données de mise à jour (sans le path)
      const updateData: UpdateData = {
        ...(updateMenuItemDto.title !== undefined && { title: updateMenuItemDto.title }),
        ...(updateMenuItemDto.parentId !== undefined && { parentId: updateMenuItemDto.parentId }),
        ...(updateMenuItemDto.isActive !== undefined && { isActive: updateMenuItemDto.isActive }),
        ...(updateMenuItemDto.order !== undefined && { order: updateMenuItemDto.order }),
        ...(updateMenuItemDto.icon !== undefined && { icon: updateMenuItemDto.icon }),
        ...(updateMenuItemDto.showIcon !== undefined && { showIcon: updateMenuItemDto.showIcon }),
      };

      console.log('Données de mise à jour:', updateData);

      // Gérer le changement de type de menu
      if (menuTypeChanged) {
        console.log('Gestion du changement de type de menu');

        // Cas 1: Changement vers BOTH
        if (menuType === MenuType.BOTH) {
          console.log('Changement vers BOTH');

          // Vérifier d'abord si des éléments avec le même chemin existent déjà
          let desktopPathExists = false;
          let mobilePathExists = false;

          if (mobileMenuItem && !desktopMenuItem) {
            // Vérifier si un élément avec le même chemin existe déjà dans le menu desktop
            const existingDesktopPath = await this.prisma.desktopMenuItem.findFirst({
              where: { path: mobileMenuItem.path }
            });

            if (existingDesktopPath) {
              console.log('Un élément avec le même chemin existe déjà dans le menu desktop');
              desktopPathExists = true;

              // Utiliser l'élément existant
              updatedDesktopItem = await this.prisma.desktopMenuItem.update({
                where: { id: existingDesktopPath.id },
                data: updateData,
              });
              console.log('Élément desktop existant mis à jour');
            }
          }

          if (desktopMenuItem && !mobileMenuItem) {
            // Vérifier si un élément avec le même chemin existe déjà dans le menu mobile
            const existingMobilePath = await this.prisma.mobileMenuItem.findFirst({
              where: { path: desktopMenuItem.path }
            });

            if (existingMobilePath) {
              console.log('Un élément avec le même chemin existe déjà dans le menu mobile');
              mobilePathExists = true;

              // Utiliser l'élément existant
              updatedMobileItem = await this.prisma.mobileMenuItem.update({
                where: { id: existingMobilePath.id },
                data: updateData,
              });
              console.log('Élément mobile existant mis à jour');
            }
          }

          // Maintenant, mettre à jour ou créer les éléments selon les besoins

          // Si l'élément existe dans le menu desktop, le mettre à jour
          if (desktopMenuItem) {
            updatedDesktopItem = await this.prisma.desktopMenuItem.update({
              where: { id },
              data: updateData,
            });
            console.log('Élément desktop mis à jour');
          }
          // Si l'élément n'existe pas dans le menu desktop et qu'aucun élément avec le même chemin n'existe
          else if (mobileMenuItem && !desktopPathExists) {
            console.log('Création d\'un nouvel élément dans le menu desktop');

            // Créer un nouvel élément dans le menu desktop
            updatedDesktopItem = await this.prisma.desktopMenuItem.create({
              data: {
                ...updateData,
                title: updateData.title || mobileMenuItem.title,
                path: mobileMenuItem.path,
                menuId: 1,
                isActive: updateData.isActive !== undefined ? updateData.isActive : mobileMenuItem.isActive,
                order: updateData.order !== undefined ? updateData.order : mobileMenuItem.order,
                showIcon: updateData.showIcon !== undefined ? updateData.showIcon : mobileMenuItem.showIcon,
                icon: updateData.icon !== undefined ? updateData.icon : mobileMenuItem.icon,
                parentId: updateData.parentId !== undefined ? updateData.parentId : mobileMenuItem.parentId,
              },
            });
            console.log('Nouvel élément desktop créé');
          }

          // Si l'élément existe dans le menu mobile, le mettre à jour
          if (mobileMenuItem) {
            updatedMobileItem = await this.prisma.mobileMenuItem.update({
              where: { id },
              data: updateData,
            });
            console.log('Élément mobile mis à jour');
          }
          // Si l'élément n'existe pas dans le menu mobile et qu'aucun élément avec le même chemin n'existe
          else if (desktopMenuItem && !mobilePathExists) {
            console.log('Création d\'un nouvel élément dans le menu mobile');

            // Créer un nouvel élément dans le menu mobile
            updatedMobileItem = await this.prisma.mobileMenuItem.create({
              data: {
                ...updateData,
                title: updateData.title || desktopMenuItem.title,
                path: desktopMenuItem.path,
                menuId: 1,
                isActive: updateData.isActive !== undefined ? updateData.isActive : desktopMenuItem.isActive,
                order: updateData.order !== undefined ? updateData.order : desktopMenuItem.order,
                showIcon: updateData.showIcon !== undefined ? updateData.showIcon : desktopMenuItem.showIcon,
                icon: updateData.icon !== undefined ? updateData.icon : desktopMenuItem.icon,
                parentId: updateData.parentId !== undefined ? updateData.parentId : desktopMenuItem.parentId,
              },
            });
            console.log('Nouvel élément mobile créé');
          }
        }
        // Cas 2: Changement vers DESKTOP uniquement
        else if (menuType === MenuType.DESKTOP) {
          console.log('Changement vers DESKTOP uniquement');

          // Mettre à jour l'élément desktop s'il existe
          if (desktopMenuItem) {
            updatedDesktopItem = await this.prisma.desktopMenuItem.update({
              where: { id },
              data: updateData,
            });
            console.log('Élément desktop mis à jour');
          } else {
            throw new NotFoundException(`L'élément de menu desktop avec l'ID ${id} n'existe pas`);
          }

          // Supprimer l'élément du menu mobile s'il existe
          if (mobileMenuItem) {
            await this.prisma.mobileMenuItem.delete({
              where: { id: mobileMenuItem.id },
            });
            console.log('Élément mobile supprimé');
          }
        }
        // Cas 3: Changement vers MOBILE uniquement
        else if (menuType === MenuType.MOBILE) {
          console.log('Changement vers MOBILE uniquement');

          // Mettre à jour l'élément mobile s'il existe
          if (mobileMenuItem) {
            updatedMobileItem = await this.prisma.mobileMenuItem.update({
              where: { id },
              data: updateData,
            });
            console.log('Élément mobile mis à jour');
          } else {
            throw new NotFoundException(`L'élément de menu mobile avec l'ID ${id} n'existe pas`);
          }

          // Supprimer l'élément du menu desktop s'il existe
          if (desktopMenuItem) {
            await this.prisma.desktopMenuItem.delete({
              where: { id: desktopMenuItem.id },
            });
            console.log('Élément desktop supprimé');
          }
        }
      }
      // Pas de changement de type de menu, mise à jour normale
      else {
        console.log('Pas de changement de type de menu, mise à jour normale');

        // Mise à jour de l'élément dans le menu desktop
        if (desktopMenuItem && (menuType === MenuType.DESKTOP || menuType === MenuType.BOTH)) {
          updatedDesktopItem = await this.prisma.desktopMenuItem.update({
            where: { id },
            data: updateData,
          });
          console.log('Élément desktop mis à jour');
        }

        // Mise à jour de l'élément dans le menu mobile
        if (mobileMenuItem && (menuType === MenuType.MOBILE || menuType === MenuType.BOTH)) {
          updatedMobileItem = await this.prisma.mobileMenuItem.update({
            where: { id },
            data: updateData,
          });
          console.log('Élément mobile mis à jour');
        }
      }

      return {
        desktop: updatedDesktopItem,
        mobile: updatedMobileItem,
      };

    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      throw error;
    }
  }

  private async validateParentUpdate(type: 'desktop' | 'mobile', itemId: number, parentId: number | null): Promise<void> {
    console.log(`Validation du parent pour ${type}, itemId=${itemId}, parentId=${parentId}`);

    // Si parentId est null, undefined ou vide, pas besoin de validation
    if (parentId === null || parentId === undefined || !parentId) {
      console.log('parentId est null ou vide, pas besoin de validation');
      return;
    }

    try {
      // Vérifier si le parent existe
      let parentExists: any = null;
      if (type === 'desktop') {
        parentExists = await this.prisma.desktopMenuItem.findUnique({
          where: { id: Number(parentId) }
        });
      } else {
        parentExists = await this.prisma.mobileMenuItem.findUnique({
          where: { id: Number(parentId) }
        });
      }

      console.log('Parent existe:', !!parentExists);

      if (!parentExists) {
        throw new NotFoundException(`Parent menu item with ID ${parentId} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Erreur lors de la validation du parent:', error);
      throw new Error(`Erreur lors de la validation du parent: ${error.message}`);
    }

    // Vérifier que le parent n'est pas l'élément lui-même
    if (Number(parentId) === Number(itemId)) {
      throw new ConflictException('Un élément de menu ne peut pas être son propre parent');
    }

    // Vérifier que le parent n'est pas un descendant de l'élément (pour éviter les cycles)
    const isDescendant = await this.isDescendant(type, Number(parentId), Number(itemId));
    if (isDescendant) {
      throw new ConflictException('Un élément de menu ne peut pas avoir un de ses descendants comme parent');
    }
  }

  private async isDescendant(type: 'desktop' | 'mobile', itemId: number, potentialAncestorId: number): Promise<boolean> {
    console.log(`Vérification si ${itemId} est un descendant de ${potentialAncestorId} dans le menu ${type}`);

    let item: { parentId: number | null } | null = null;

    try {
      if (type === 'desktop') {
        item = await this.prisma.desktopMenuItem.findUnique({
          where: { id: Number(itemId) },
          select: { parentId: true },
        });
      } else {
        item = await this.prisma.mobileMenuItem.findUnique({
          where: { id: Number(itemId) },
          select: { parentId: true },
        });
      }
    } catch (error) {
      console.error(`Erreur dans isDescendant: ${error.message}`);
      return false;
    }

    if (!item || item.parentId === null) {
      return false;
    }

    if (Number(item.parentId) === Number(potentialAncestorId)) {
      return true;
    }

    return this.isDescendant(type, Number(item.parentId), Number(potentialAncestorId));
  }
}
