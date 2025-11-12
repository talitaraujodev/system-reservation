import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BookingPersistenceAdapter } from 'src/adapter/output/persistense/BookingPersistenceAdapter';
import { BookingEntity } from 'src/adapter/output/persistense/entities/BookingEntity';
import { BookingService } from './services/BookingService';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([BookingEntity]),
    ClientsModule.register([
      {
        name: 'BOOKING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL || 'amqp://rabbitmq:5672'],
          queue: 'booking_queue',
        },
      },
    ]),
  ],
  providers: [
    {
      provide: 'BookingPersistence',
      useClass: BookingPersistenceAdapter,
    },
    {
      provide: 'BookingServiceInputPort',
      useClass: BookingService,
    },
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
  ],
})
export class ApplicationModule {}
