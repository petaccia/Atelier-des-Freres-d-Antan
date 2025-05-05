import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

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

        // Créer la table Admin
        await prisma.$executeRaw`
          CREATE TABLE IF NOT EXISTS "Admin" (
            "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
            "username" TEXT NOT NULL,
            "password" TEXT NOT NULL,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

            CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
          );

          CREATE UNIQUE INDEX IF NOT EXISTS "Admin_username_key" ON "Admin"("username");
        `;

        // Créer la table Menu
        await prisma.$executeRaw`
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
          );

          CREATE UNIQUE INDEX IF NOT EXISTS "Menu_path_deviceType_key" ON "Menu"("path", "deviceType");
        `;

        // Ajouter la contrainte de clé étrangère après la création des tables
        await prisma.$executeRaw`
          ALTER TABLE "Menu"
          ADD CONSTRAINT IF NOT EXISTS "Menu_parentId_fkey"
          FOREIGN KEY ("parentId")
          REFERENCES "Menu"("id")
          ON DELETE SET NULL
          ON UPDATE CASCADE;
        `;

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

  // Configuration CORS
  if (process.env.CORS_ALLOW_ALL === 'true') {
    // Configuration CORS permissive pour le débogage
    console.log('Using permissive CORS configuration');
    app.enableCors({
      origin: true, // Permet toutes les origines
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  } else {
    // Configuration CORS normale
    console.log('Using normal CORS configuration');
    app.enableCors({
      origin: [
        'http://localhost:3000',
        'https://atelier-des-freres-dantan-frontend-6ufxqxo8e.vercel.app',
        'https://atelier-des-freres-dantan.vercel.app',
        process.env.FRONTEND_URL || '',
      ].filter(Boolean), // Filtrer les valeurs vides
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  }

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
