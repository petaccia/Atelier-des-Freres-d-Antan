import { Injectable } from '@nestjs/common';
import { SqlExecutorService } from './sql-executor.service';

@Injectable()
export class AdminSqlService {
  constructor(private sqlExecutor: SqlExecutorService) {}

  /**
   * Trouve un administrateur par son nom d'utilisateur
   * @param username Nom d'utilisateur
   * @returns L'administrateur trouvé ou null
   */
  async findByUsername(username: string) {
    const admins = await this.sqlExecutor.queryRaw<any>('admin', 'find-by-username', username);
    return admins.length > 0 ? admins[0] : null;
  }

  /**
   * Crée un nouvel administrateur
   * @param username Nom d'utilisateur
   * @param password Mot de passe (déjà hashé)
   * @returns L'administrateur créé
   */
  async create(username: string, password: string) {
    const admins = await this.sqlExecutor.queryRaw<any>('admin', 'create-admin', username, password);
    return admins[0];
  }

  /**
   * Met à jour le mot de passe d'un administrateur
   * @param username Nom d'utilisateur
   * @param password Nouveau mot de passe (déjà hashé)
   * @returns L'administrateur mis à jour
   */
  async updatePassword(username: string, password: string) {
    const admins = await this.sqlExecutor.queryRaw<any>('admin', 'update-admin', username, password);
    return admins[0];
  }
}
