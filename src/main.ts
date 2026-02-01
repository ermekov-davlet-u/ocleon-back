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
