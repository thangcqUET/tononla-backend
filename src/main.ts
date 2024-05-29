import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const clientOrigins = process.env.CLIENT_ORIGINS?.split(',') || '*';
  app.enableCors({ origin: clientOrigins });
  await app.listen(3001);
}
bootstrap();
