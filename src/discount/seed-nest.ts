// src/discount/seed-nest.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { seedDiscounts } from './discount.seed';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  try {
    const dataSource = app.get(DataSource);
    await seedDiscounts(dataSource);
    console.log('✅ Discounts seeded');
  } catch (e) {
    console.error('❌ Seeding failed:', e);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}
bootstrap();
