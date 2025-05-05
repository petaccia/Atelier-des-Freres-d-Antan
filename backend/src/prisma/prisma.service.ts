import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['error'],
      // Ajouter des options de connexion pour améliorer les performances
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('PrismaService connected to database');

    // Réinitialiser la base de données (supprimer et recréer les tables)
    const resetDatabase = process.env.RESET_DATABASE === 'true';
    if (resetDatabase) {
      console.log('RESET_DATABASE is true, dropping and recreating tables...');
      await this.resetDatabase();
    } else {
      // Initialiser la base de données si nécessaire
      await this.initDatabase();
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('PrismaService disconnected from database');
  }

  async resetDatabase() {
    try {
      console.log('Dropping tables...');

      // Supprimer d'abord les contraintes de clé étrangère
      try {
        await this.$executeRaw`
          ALTER TABLE IF EXISTS "Menu" DROP CONSTRAINT IF EXISTS "Menu_parentId_fkey"
        `;
        console.log('Foreign key constraints dropped');
      } catch (error) {
        console.error('Error dropping foreign key constraints:', error);
      }

      // Supprimer les tables
      try {
        await this.$executeRaw`DROP TABLE IF EXISTS "Menu" CASCADE`;
        console.log('Menu table dropped');
      } catch (error) {
        console.error('Error dropping Menu table:', error);
      }

      try {
        await this.$executeRaw`DROP TABLE IF EXISTS "Admin" CASCADE`;
        console.log('Admin table dropped');
      } catch (error) {
        console.error('Error dropping Admin table:', error);
      }

      console.log('All tables dropped successfully');

      // Recréer les tables
      await this.initDatabase();
    } catch (error) {
      console.error('Error resetting database:', error);
    }
  }

  async initDatabase() {
    try {
      // Vérifier si la table Admin existe
      try {
        // Vérifier l'existence de la table dans le schéma d'information
        const tableExists = await this.$queryRaw<{ exists: boolean }>`
          SELECT EXISTS (
            SELECT FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_name = 'Admin'
          )
        `;

        const exists = tableExists[0].exists;

        if (exists) {
          console.log('Database tables already exist');

          // Vérifier si l'utilisateur admin existe
          const adminExists = await this.admin.findUnique({
            where: { username: 'sebastien' }
          });

          if (!adminExists) {
            console.log('Admin user does not exist, creating...');
            const hashedPassword = await bcrypt.hash('admin123456', 10);
            const admin = await this.admin.create({
              data: {
                username: 'sebastien',
                password: hashedPassword
              }
            });
            console.log('Admin user created successfully:', admin.username);
          } else {
            console.log('Admin user already exists');
          }

          return; // Sortir de la fonction si les tables existent déjà
        } else {
          console.log('Tables do not exist, initializing database...');
        }
      } catch (error) {
        console.error('Error checking if tables exist:', error);
        // Continuer avec l'initialisation même en cas d'erreur
        console.log('Initializing database...');
      }

      // Créer les tables à partir du schéma Prisma
      try {
        console.log('Creating database schema...');

        // Créer la table Admin
        await this.$executeRaw`
          CREATE TABLE IF NOT EXISTS "Admin" (
            "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
            "username" TEXT NOT NULL,
            "password" TEXT NOT NULL,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

            CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
          )
        `;

        await this.$executeRaw`
          CREATE UNIQUE INDEX IF NOT EXISTS "Admin_username_key" ON "Admin"("username")
        `;

        // Créer la table Menu
        await this.$executeRaw`
          CREATE TABLE IF NOT EXISTS "Menu" (
            "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
            "title" TEXT NOT NULL,
            "path" TEXT NOT NULL,
            "icon" TEXT,
            "parentId" TEXT,
            "deviceType" TEXT NOT NULL,
            "order" INTEGER NOT NULL DEFAULT 0,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

            CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
          )
        `;

        await this.$executeRaw`
          CREATE UNIQUE INDEX IF NOT EXISTS "Menu_path_deviceType_key" ON "Menu"("path", "deviceType")
        `;

        await this.$executeRaw`
          ALTER TABLE IF EXISTS "Menu"
          ADD CONSTRAINT IF NOT EXISTS "Menu_parentId_fkey"
          FOREIGN KEY ("parentId")
          REFERENCES "Menu"("id")
          ON DELETE SET NULL
          ON UPDATE CASCADE
        `;

        console.log('Database schema created successfully');

        // Créer l'utilisateur admin
        console.log('Creating admin user...');
        const hashedPassword = await bcrypt.hash('admin123456', 10);
        const admin = await this.admin.create({
          data: {
            username: 'sebastien',
            password: hashedPassword
          }
        });
        console.log('Admin user created successfully:', admin.username);
      } catch (error) {
        console.error('Error creating database schema:', error);

        // Si l'erreur est que la table existe déjà, essayons de créer l'utilisateur admin
        try {
          console.log('Trying to create admin user anyway...');
          const hashedPassword = await bcrypt.hash('admin123456', 10);
          const admin = await this.admin.create({
            data: {
              username: 'sebastien',
              password: hashedPassword
            }
          });
          console.log('Admin user created successfully:', admin.username);
        } catch (adminError) {
          console.error('Error creating admin user:', adminError);
        }
      }
    } catch (error) {
      console.error('Error in initDatabase:', error);
    }
  }
}
