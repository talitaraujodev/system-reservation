import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { NotificationServiceInputPort } from '../input/NotificationServiceInputPort';
import type { RabbitMqAdapterOutputPort } from '../output/RabbitMqAdapterOutputPort';

@Injectable()
export class NotificationService
  implements NotificationServiceInputPort, OnModuleInit
{
  constructor(
    @Inject('RabbitMqAdapterOutputPort')
    private readonly rabbitMqAdapter: RabbitMqAdapterOutputPort,
  ) {}

  async onModuleInit() {
    console.log('Iniciando consumo de eventos do RabbitMQ...');
    await this.handleBookingCreated();
    console.log('Consumidor de eventos do RabbitMQ iniciado com sucesso!');
  }

  async handleBookingCreated(): Promise<void> {
    await this.rabbitMqAdapter.consume('notifications_queue', (message) => {
      console.log('Evento recebido:', message.content.toString());
    });
  }
}
