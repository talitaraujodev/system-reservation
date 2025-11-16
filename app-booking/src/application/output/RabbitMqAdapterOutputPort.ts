import { Message } from 'amqplib';
export type Queque = 'booking_queue' | 'notification_queue';
export type Exchange = 'amq.topic';

export interface RabbitMqAdapterOutputPort {
  publishInQueue(queue: Queque, message: string): Promise<boolean>;
  publishInExchange(
    exchange: Exchange,
    routingKey: string,
    message: string,
  ): Promise<boolean>;
  consume(queue: Queque, callback: (message: Message) => void): Promise<void>;
}
