import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { initDatabase } from './database/database-initializer';

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
