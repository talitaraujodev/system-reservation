import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import envConfig from './config/envConfig';

async function bootstrap() {
  const httpApp = await NestFactory.create(AppModule);
  httpApp.enableCors();
  await httpApp.listen(envConfig.serverPort);
}

void bootstrap();
