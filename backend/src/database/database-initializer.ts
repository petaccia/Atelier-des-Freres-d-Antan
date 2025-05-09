import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { loadSqlFile } from '../utils/sql-loader';

/**
 * Initialise la base de données en créant les tables si elles n'existent pas
 */
export async function initDatabase() {
  const prisma = new PrismaClient();
  try {
    // Vérifier si la table Admin existe
    try {
      await prisma.$queryRaw`SELECT 1 FROM "Admin" LIMIT 1`;
      console.log('Database tables already exist');
    } catch (error) {
      console.log('Initializing database...');

      try {
        // Créer le schéma directement à partir du modèle Prisma
        console.log('Creating database schema from Prisma model...');

        // Créer la table Admin en utilisant le fichier SQL
        const createAdminTableSql = loadSqlFile('admin', 'create-table');
        await prisma.$executeRaw`${createAdminTableSql}`;

        // Créer l'index pour la table Admin
        const createAdminIndexSql = loadSqlFile('admin', 'create-index');
        await prisma.$executeRaw`${createAdminIndexSql}`;

        // Créer la table Menu
        const createMenuTableSql = loadSqlFile('menu', 'create-table');
        await prisma.$executeRaw`${createMenuTableSql}`;

        // Créer l'index pour la table Menu
        const createMenuIndexSql = loadSqlFile('menu', 'create-index');
        await prisma.$executeRaw`${createMenuIndexSql}`;

        // Ajouter la contrainte de clé étrangère après la création des tables
        const addMenuForeignKeySql = loadSqlFile('menu', 'add-foreign-key');
        await prisma.$executeRaw`${addMenuForeignKeySql}`;

        console.log('Database schema created successfully');

        // Créer l'utilisateur admin directement
        console.log('Creating admin user directly...');
        const hashedPassword = await bcrypt.hash('admin123456', 10);
        const admin = await prisma.admin.create({
          data: {
            username: 'sebastien',
            password: hashedPassword
          }
        });
        console.log('Admin user created successfully:', admin.username);
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    }
  } finally {
    await prisma.$disconnect();
  }
}
