import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingPersistenceAdapter } from 'src/adapter/output/persistense/BookingPersistenceAdapter';
import { BookingEntity } from 'src/adapter/output/persistense/entities/BookingEntity';
import { BookingService } from './services/BookingService';
import { RabbitMQProvider } from './providers/rabbitMqProvider';
import { RabbitMqAdapter } from 'src/adapter/output/RabbitMqAdapter';

@Global()
@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([BookingEntity])],
  providers: [
    {
      provide: 'BookingPersistence',
      useClass: BookingPersistenceAdapter,
    },
    {
      provide: 'BookingServiceInputPort',
      useClass: BookingService,
    },
    {
      provide: 'RabbitMqAdapterOutputPort',
      useClass: RabbitMqAdapter,
    },
    RabbitMQProvider,
  ],
  exports: [
    {
      provide: 'BookingPersistence',
      useClass: BookingPersistenceAdapter,
    },
    {
      provide: 'BookingServiceInputPort',
      useClass: BookingService,
    },
    {
      provide: 'RabbitMqAdapterOutputPort',
      useClass: RabbitMqAdapter,
    },
    RabbitMQProvider,
  ],
})
export class ApplicationModule {}
