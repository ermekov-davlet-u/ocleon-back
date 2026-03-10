// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import * as fs from 'fs';
// import * as path from 'path';

// async function bootstrap() {
//   const httpsOptions = {
//     key: fs.readFileSync('/etc/letsencrypt/live/ocleon.333.kg/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/ocleon.333.kg/fullchain.pem'),
//   };

//   const app = await NestFactory.create<NestExpressApplication>(
//     AppModule,
//     { httpsOptions },
//   );

//   app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
//     prefix: '/uploads/',
//   });

//   app.enableCors({
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   });

//   await app.listen(443);
//   console.log('NestJS HTTPS Server running on port 443');
// }

// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включаем CORS
  app.enableCors({
    origin: '*', // разрешить все домены, можно заменить на конкретные, например: ['http://localhost:3000']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // если нужны куки
  });

  await app.listen(5000);
  console.log('Server is running on http://localhost:5000');
}
bootstrap();
