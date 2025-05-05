import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function initDatabase() {
  const prisma = new PrismaClient();
  try {
    // Vérifier si la table Admin existe
    await prisma.$queryRaw`SELECT 1 FROM "Admin" LIMIT 1`;
    console.log('Database tables already exist');
  } catch (error) {
    console.log('Initializing database...');
    try {
      // Exécuter les migrations
      console.log('Running migrations...');
      await execAsync('npx prisma migrate deploy');
      console.log('Migrations completed');

      // Créer un utilisateur admin par défaut
      try {
        console.log('Creating default admin user...');
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = await prisma.admin.create({
          data: {
            username: 'admin',
            password: hashedPassword
          }
        });
        console.log('Default admin user created:', admin.username);
      } catch (adminError) {
        console.error('Error creating admin user:', adminError);
      }
    } catch (migrationError) {
      console.error('Error running migrations:', migrationError);
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
