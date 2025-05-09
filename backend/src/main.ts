import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { loadSqlFile } from './utils/sql-loader';

async function initDatabase() {
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

async function bootstrap() {
  // Initialiser la base de données avant de démarrer l'application
  await initDatabase();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Menu API')
    .setDescription('API pour la gestion des menus')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Configuration CORS simplifiée et optimisée
  console.log('Configuring CORS...');
  app.enableCors({
    origin: process.env.CORS_ALLOW_ALL === 'true'
      ? true // Permet toutes les origines si CORS_ALLOW_ALL est true
      : [
          'http://localhost:3000',
          'https://atelier-des-freres-dantan-frontend-6ufxqxo8e.vercel.app',
          'https://atelier-des-freres-dantan.vercel.app',
          process.env.FRONTEND_URL || '',
        ].filter(Boolean), // Filtrer les valeurs vides
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
