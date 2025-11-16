import { Inject, Injectable } from '@nestjs/common';
import { NotificationServiceInputPort } from '../input/NotificationServiceInputPort';
import type { RabbitMqAdapterOutputPort } from '../output/RabbitMqAdapterOutputPort';

@Injectable()
export class NotificationService implements NotificationServiceInputPort {
  constructor(
    @Inject('RabbitMqAdapterOutputPort')
    private readonly rabbitMqAdapter: RabbitMqAdapterOutputPort,
  ) {}

  async handleBookingCreated(): Promise<void> {
    await this.rabbitMqAdapter.consume('notification_queue', (message) => {
      console.log(message.content.toString());
    });
  }
}
