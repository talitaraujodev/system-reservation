import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { NotificationService } from './services/NotificantionService';
import { RabbitMQProvider } from './providers/rabbitMqProvider';
import { RabbitMqAdapter } from 'src/adapter/output/RabbitMqAdapter';

@Global()
@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([])],
  providers: [
    {
      provide: 'NotificationServiceInputPort',
      useClass: NotificationService,
    },
    {
      provide: 'RabbitMqAdapterOutputPort',
      useClass: RabbitMqAdapter,
    },
    RabbitMQProvider,
  ],
  exports: [
    {
      provide: 'NotificationServiceInputPort',
      useClass: NotificationService,
    },
    {
      provide: 'RabbitMqAdapterOutputPort',
      useClass: RabbitMqAdapter,
    },
    RabbitMQProvider,
  ],
})
export class ApplicationModule {}
