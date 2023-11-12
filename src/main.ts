import { NestFactory } from '@nestjs/core';
import { DataBaseModule } from './database/database.module';

async function bootstrap() {
  const app = await NestFactory.create(DataBaseModule);
  await app.listen(3000);
}
bootstrap();
