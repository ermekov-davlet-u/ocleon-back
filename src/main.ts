// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';

async function bootstrap() {
  // инициализация пула один раз
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log('Database connected');
  }

  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
