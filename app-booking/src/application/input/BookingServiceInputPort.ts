import { Booking } from 'src/domain/models/Booking';
import { InputCreateBookingDto } from './dto/InputCreateBookingDto';
import { InputUpdateBookingDto } from './dto/InputUpdateBookingDto';

export interface BookingServiceInputPort {
  create(booking: InputCreateBookingDto): Promise<Booking>;
  update(booking: InputUpdateBookingDto): Promise<Booking>;
  delete(bookingId: string): Promise<void>;
  findOne(bookingId: string): Promise<Booking>;
  findAll(): Promise<Booking[]>;
}
