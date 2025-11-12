import { Booking } from 'src/domain/models/Booking';

export interface BookingPersistenceOutputPort {
  create(booking: Booking): Promise<Booking>;
  update(booking: Booking): Promise<Booking>;
  delete(bookingId: string): Promise<void>;
  findOne(bookingId: string): Promise<Booking>;
  findAll(): Promise<Booking[]>;
}
