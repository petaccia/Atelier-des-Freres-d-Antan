import { Injectable } from '@nestjs/common';
import { SqlExecutorService } from './sql-executor.service';

@Injectable()
export class MenuSqlService {
  constructor(private sqlExecutor: SqlExecutorService) {}

  /**
   * Trouve tous les menus par type d'appareil
   * @param deviceType Type d'appareil (desktop, mobile, etc.)
   * @returns Liste des menus
   */
  async findByDeviceType(deviceType: string) {
    return await this.sqlExecutor.queryRaw<any>('menu', 'find-by-device-type', deviceType);
  }

  /**
   * Crée un nouvel élément de menu
   * @param title Titre
   * @param path Chemin
   * @param icon Icône (optionnel)
   * @param parentId ID du parent (optionnel)
   * @param deviceType Type d'appareil
   * @param order Ordre
   * @returns L'élément de menu créé
   */
  async create(title: string, path: string, icon: string | null, parentId: string | null, deviceType: string, order: number) {
    const menus = await this.sqlExecutor.queryRaw<any>('menu', 'create-menu-item', title, path, icon, parentId, deviceType, order);
    return menus[0];
  }

  /**
   * Met à jour un élément de menu
   * @param id ID de l'élément de menu
   * @param title Titre
   * @param path Chemin
   * @param icon Icône (optionnel)
   * @param parentId ID du parent (optionnel)
   * @param order Ordre
   * @returns L'élément de menu mis à jour
   */
  async update(id: string, title: string, path: string, icon: string | null, parentId: string | null, order: number) {
    const menus = await this.sqlExecutor.queryRaw<any>('menu', 'update-menu-item', id, title, path, icon, parentId, order);
    return menus[0];
  }

  /**
   * Supprime un élément de menu
   * @param id ID de l'élément de menu
   * @returns L'élément de menu supprimé
   */
  async delete(id: string) {
    const menus = await this.sqlExecutor.queryRaw<any>('menu', 'delete-menu-item', id);
    return menus[0];
  }
}
