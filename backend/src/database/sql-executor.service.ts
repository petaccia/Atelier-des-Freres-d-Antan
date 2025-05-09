import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { loadSqlFile } from '../utils/sql-loader';

@Injectable()
export class SqlExecutorService {
  constructor(private prisma: PrismaService) {}

  /**
   * Exécute une requête SQL qui ne retourne pas de résultat
   * @param entity Entité concernée (admin, menu, schema, etc.)
   * @param fileName Nom du fichier SQL sans l'extension
   * @param params Paramètres à passer à la requête
   * @returns Le nombre de lignes affectées
   */
  async executeRaw(entity: string, fileName: string, ...params: any[]): Promise<number> {
    try {
      const query = loadSqlFile(entity, fileName);
      
      // Vérifier si la requête contient plusieurs instructions SQL
      const statements = query.split(';').filter(stmt => stmt.trim().length > 0);
      
      if (statements.length > 1) {
        // Exécuter chaque instruction séparément
        let totalAffected = 0;
        for (const statement of statements) {
          if (statement.trim()) {
            const affected = await this.executeRawStatement(statement, params);
            totalAffected += affected;
          }
        }
        return totalAffected;
      } else {
        // Une seule instruction, l'exécuter normalement
        return await this.executeRawStatement(query, params);
      }
    } catch (error) {
      console.error(`Error executing SQL query ${entity}/${fileName}:`, error);
      throw error;
    }
  }
  
  /**
   * Exécute une requête SQL qui retourne des résultats
   * @param entity Entité concernée (admin, menu, schema, etc.)
   * @param fileName Nom du fichier SQL sans l'extension
   * @param params Paramètres à passer à la requête
   * @returns Les résultats de la requête
   */
  async queryRaw<T = any>(entity: string, fileName: string, ...params: any[]): Promise<T[]> {
    try {
      const query = loadSqlFile(entity, fileName);
      
      // Les requêtes de lecture ne devraient pas contenir plusieurs instructions
      // mais nous vérifions quand même pour être sûrs
      const statements = query.split(';').filter(stmt => stmt.trim().length > 0);
      
      if (statements.length > 1) {
        console.warn(`Warning: Query ${entity}/${fileName} contains multiple statements. Only the first one will be executed.`);
      }
      
      // Utiliser seulement la première instruction
      const statement = statements[0];
      
      return await this.queryRawStatement<T>(statement, params);
    } catch (error) {
      console.error(`Error executing SQL query ${entity}/${fileName}:`, error);
      throw error;
    }
  }
  
  /**
   * Exécute une instruction SQL brute qui ne retourne pas de résultat
   * @param query Requête SQL à exécuter
   * @param params Paramètres à passer à la requête
   * @returns Le nombre de lignes affectées
   */
  private async executeRawStatement(query: string, params: any[]): Promise<number> {
    // Construire la requête avec les paramètres
    if (params && params.length > 0) {
      // Convertir les paramètres en chaîne de caractères pour les utiliser dans la requête
      const values = params.map(param => 
        param === null ? 'NULL' : 
        typeof param === 'string' ? `'${param.replace(/'/g, "''")}'` : 
        param
      );
      
      // Remplacer les paramètres $1, $2, etc. par les valeurs
      let paramQuery = query;
      for (let i = 0; i < values.length; i++) {
        const regex = new RegExp(`\\$${i + 1}\\b`, 'g');
        paramQuery = paramQuery.replace(regex, values[i].toString());
      }
      
      return await this.prisma.$executeRaw`${paramQuery}`;
    } else {
      return await this.prisma.$executeRaw`${query}`;
    }
  }
  
  /**
   * Exécute une instruction SQL brute qui retourne des résultats
   * @param query Requête SQL à exécuter
   * @param params Paramètres à passer à la requête
   * @returns Les résultats de la requête
   */
  private async queryRawStatement<T = any>(query: string, params: any[]): Promise<T[]> {
    // Construire la requête avec les paramètres
    if (params && params.length > 0) {
      // Convertir les paramètres en chaîne de caractères pour les utiliser dans la requête
      const values = params.map(param => 
        param === null ? 'NULL' : 
        typeof param === 'string' ? `'${param.replace(/'/g, "''")}'` : 
        param
      );
      
      // Remplacer les paramètres $1, $2, etc. par les valeurs
      let paramQuery = query;
      for (let i = 0; i < values.length; i++) {
        const regex = new RegExp(`\\$${i + 1}\\b`, 'g');
        paramQuery = paramQuery.replace(regex, values[i].toString());
      }
      
      return await this.prisma.$queryRaw<T[]>`${paramQuery}`;
    } else {
      return await this.prisma.$queryRaw<T[]>`${query}`;
    }
  }
}
