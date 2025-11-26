import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Channel, Message } from 'amqplib';
import {
  Exchange,
  Queque,
  RabbitMqAdapterOutputPort,
} from 'src/application/output/RabbitMqAdapterOutputPort';
import type { RabbitMQProviderType } from 'src/application/providers/rabbitMqProvider';

@Injectable()
export class RabbitMqAdapter
  implements RabbitMqAdapterOutputPort, OnModuleInit
{
  private channel: Channel;

  constructor(
    @Inject('RABBITMQ_PROVIDER')
    private readonly rabbitMQProvider: RabbitMQProviderType,
  ) {}

  async onModuleInit() {
    if (!this.channel) {
      this.channel = await this.rabbitMQProvider;
      await this.setupExchangesAndQueues();
    }
  }

  async start() {
    if (!this.channel) {
      this.channel = await this.rabbitMQProvider;
      await this.setupExchangesAndQueues();
    }
  }

  private async setupExchangesAndQueues() {
    try {
      // Create exchange
      await this.channel.assertExchange(
        'app.system.reservation.topic',
        'topic',
        {
          durable: true,
        },
      );

      // Create queues
      await this.channel.assertQueue('bookings_queue', { durable: true });
      await this.channel.assertQueue('notifications_queue', { durable: true });
      await this.channel.assertQueue('reservations_calender_queue', {
        durable: true,
      });
      await this.channel.assertQueue('payments_queue', { durable: true });

      // Bind queues to exchange
      await this.channel.bindQueue(
        'bookings_queue',
        'app.system.reservation.topic',
        'calendar.*',
      );

      await this.channel.bindQueue(
        'reservations_calender_queue',
        'app.system.reservation.topic',
        'booking.*',
      );

      await this.channel.bindQueue(
        'reservations_calender_queue',
        'app.system.reservation.topic',
        'payment.*',
      );

      await this.channel.bindQueue(
        'notifications_queue',
        'app.system.reservation.topic',
        'booking.*',
      );

      await this.channel.bindQueue(
        'notifications_queue',
        'app.system.reservation.topic',
        'payment.*',
      );

      await this.channel.bindQueue(
        'notifications_queue',
        'app.system.reservation.topic',
        'calendar.*',
      );

      this.channel.on('error', (err) => {
        console.error('RabbitMQ channel error:', err);
      });

      this.channel.on('close', () => {
        console.warn('RabbitMQ channel closed');
      });
    } catch (error) {
      console.error('Error setting up RabbitMQ exchanges and queues:', error);
      throw error;
    }
  }

  async publishInQueue(queue: Queque, message: string) {
    if (!this.channel) {
      await this.start();
    }
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async publishInExchange(
    exchange: Exchange,
    routingKey: string,
    message: string,
  ) {
    if (!this.channel) {
      await this.start();
    }
    return this.channel.publish(exchange, routingKey, Buffer.from(message));
  }

  async consume(queue: Queque, callback?: (message: Message) => void) {
    if (!this.channel) {
      await this.start();
    }
    return this.channel.consume(queue, (message) => {
      if (!message) return;
      if (callback) callback(message);
      this.channel.ack(message);
    });
  }
}
