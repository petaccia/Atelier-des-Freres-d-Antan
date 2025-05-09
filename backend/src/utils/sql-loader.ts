import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Charge le contenu d'un fichier SQL
 * @param entity Entité concernée (admin, menu, schema, etc.)
 * @param fileName Nom du fichier SQL sans l'extension
 * @returns Le contenu du fichier SQL
 */
export function loadSqlFile(entity: string, fileName: string): string {
  try {
    // Essayer d'abord le chemin relatif au répertoire de build
    let filePath = join(__dirname, '..', 'sql', entity, `${fileName}.sql`);
    
    // Si le fichier n'existe pas, essayer le chemin relatif au répertoire source
    if (!existsSync(filePath)) {
      filePath = join(process.cwd(), 'src', 'sql', entity, `${fileName}.sql`);
    }
    
    // Si le fichier n'existe toujours pas, essayer le chemin absolu
    if (!existsSync(filePath)) {
      filePath = join(process.cwd(), 'backend', 'src', 'sql', entity, `${fileName}.sql`);
    }
    
    if (!existsSync(filePath)) {
      throw new Error(`SQL file not found: ${entity}/${fileName}.sql`);
    }
    
    console.log(`Loading SQL file from: ${filePath}`);
    return readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error loading SQL file ${entity}/${fileName}.sql:`, error);
    throw new Error(`Failed to load SQL file: ${entity}/${fileName}.sql`);
  }
}
