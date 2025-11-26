import { Message } from 'amqplib';
export type Queque =
  | 'bookings_queue'
  | 'notifications_queue'
  | 'reservations_calender_queue'
  | 'payments_queue';
export type Exchange = 'app.system.reservation.topic';

export interface RabbitMqAdapterOutputPort {
  publishInQueue(queue: Queque, message: string): Promise<boolean>;
  publishInExchange(
    exchange: Exchange,
    routingKey: string,
    message: string,
  ): Promise<boolean>;
  consume(queue: Queque, callback: (message: Message) => void): Promise<void>;
}
