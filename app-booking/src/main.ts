import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import envConfig from './config/envConfig';

async function bootstrap() {
  const httpApp = await NestFactory.create(AppModule);
  httpApp.enableCors();
  await httpApp.listen(envConfig.serverPort);

  httpApp.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'booking_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  await httpApp.startAllMicroservices();
}

void bootstrap();
