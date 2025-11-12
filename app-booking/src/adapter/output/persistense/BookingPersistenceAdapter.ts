import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingPersistenceOutputPort } from 'src/application/output/BookingPersistenceOutputPort';
import { Booking } from 'src/domain/models/Booking';
import { BookingEntity } from './entities/BookingEntity';

@Injectable()
export class BookingPersistenceAdapter implements BookingPersistenceOutputPort {
  constructor(
    @InjectRepository(BookingEntity)
    public readonly bookingRepository: Repository<BookingEntity>,
  ) {}
  async create(booking: Booking): Promise<Booking> {
    return this.bookingRepository.save(booking);
  }
  async update(booking: Booking): Promise<Booking> {
    return this.bookingRepository.save(booking);
  }
  async delete(bookingId: string): Promise<void> {
    await this.bookingRepository.delete(bookingId);
  }
  async findOne(bookingId: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return new Booking(
      booking.id,
      booking.userId,
      booking.resourceId,
      booking.startAt.toISOString(),
      booking.endAt.toISOString(),
      booking.status as Booking['status'],
    );
  }
  async findAll(): Promise<Booking[]> {
    const bookings = await this.bookingRepository.find();
    return bookings.map(
      (booking: BookingEntity) =>
        new Booking(
          booking.id,
          booking.userId,
          booking.resourceId,
          booking.startAt.toISOString(),
          booking.endAt.toISOString(),
          booking.status as Booking['status'],
        ),
    );
  }
}
