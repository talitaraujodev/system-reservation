import { Booking } from 'src/domain/models/Booking';

export interface NotificationServiceInputPort {
  handleBookingCreated(): Promise<void>;
}
