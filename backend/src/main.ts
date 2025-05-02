import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Menu API')
    .setDescription('API pour la gestion des menus')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Définir les origines autorisées
  const allowedOrigins = [
    'http://localhost:3000',
    'https://atelier-des-freres-dantan-frontend-6ufxqxo8e.vercel.app',
    'https://atelier-des-freres-dantan.vercel.app',
    // Ajoutez d'autres origines si nécessaire
  ];

  // Ajouter l'origine depuis la variable d'environnement si elle existe
  if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
  }

  app.enableCors({
    origin: (origin, callback) => {
      // Permettre les requêtes sans origine (comme les appels API mobiles ou Postman)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        console.warn(`Origine bloquée par CORS: ${origin}`);
        callback(new Error('Non autorisé par CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
