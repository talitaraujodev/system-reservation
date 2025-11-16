import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { BookingServiceInputPort } from '../input/BookingServiceInputPort';
import type { BookingPersistenceOutputPort } from '../output/BookingPersistenceOutputPort';
import { Booking } from 'src/domain/models/Booking';
import { InputCreateBookingDto } from '../input/dto/InputCreateBookingDto';
import type { InputUpdateBookingDto } from '../input/dto/InputUpdateBookingDto';
import type { RabbitMqAdapterOutputPort } from '../output/RabbitMqAdapterOutputPort';

@Injectable()
export class BookingService implements BookingServiceInputPort {
  constructor(
    @Inject('BookingPersistence')
    private readonly bookingPersistenceOutputPort: BookingPersistenceOutputPort,
    @Inject('RabbitMqAdapterOutputPort')
    private readonly rabbitMqAdapter: RabbitMqAdapterOutputPort,
  ) {}

  async create(booking: InputCreateBookingDto): Promise<Booking> {
    const createBooking = new Booking(
      uuidv4(),
      booking.userId,
      booking.resourceId,
      booking.startAt,
      booking.endAt,
      'PENDING',
    );

    const validation = createBooking.validate();

    if (validation) {
      throw new BadRequestException(validation);
    }

    const createdBooking =
      await this.bookingPersistenceOutputPort.create(createBooking);

    await this.rabbitMqAdapter.publishInExchange(
      'amq.topic',
      'booking.created',
      JSON.stringify({ ...createdBooking }),
    );

    return createdBooking;
  }

  async update(booking: InputUpdateBookingDto): Promise<Booking> {
    const updateBooking = new Booking(
      booking.id,
      booking.userId,
      booking.resourceId,
      booking.startAt,
      booking.endAt,
      booking.status,
    );
    const bookingData = await this.bookingPersistenceOutputPort.findOne(
      updateBooking.id,
    );
    if (!bookingData) {
      throw new HttpException('Booking not found', HttpStatus.NOT_FOUND);
    }

    if (booking.userId && booking.userId !== bookingData.userId) {
      bookingData.userId = booking.userId;
    }

    if (booking.resourceId && booking.resourceId !== bookingData.resourceId) {
      bookingData.resourceId = booking.resourceId;
    }

    if (booking.startAt && booking.startAt !== bookingData.startAt) {
      bookingData.startAt = booking.startAt;
    }

    if (booking.endAt && booking.endAt !== bookingData.endAt) {
      bookingData.endAt = booking.endAt;
    }

    if (booking.status && booking.status !== bookingData.status) {
      bookingData.status = booking.status;
    }
    const updatedBooking =
      await this.bookingPersistenceOutputPort.update(bookingData);
    await this.rabbitMqAdapter.publishInExchange(
      'amq.topic',
      'booking.updated',
      JSON.stringify({ ...updatedBooking }),
    );
    return updatedBooking;
  }
  async delete(bookingId: string): Promise<void> {
    await this.bookingPersistenceOutputPort.delete(bookingId);
    await this.rabbitMqAdapter.publishInExchange(
      'amq.topic',
      'booking.deleted',
      JSON.stringify({ bookingId }),
    );
  }
  async findOne(bookingId: string): Promise<Booking> {
    const booking = await this.bookingPersistenceOutputPort.findOne(bookingId);
    if (!booking) {
      throw new HttpException('Booking not found', HttpStatus.NOT_FOUND);
    }
    return booking;
  }
  async findAll(): Promise<Booking[]> {
    await this.rabbitMqAdapter.publishInExchange(
      'amq.topic',
      'booking.findAll',
      JSON.stringify({ bookings: [], success: true }),
    );
    return await this.bookingPersistenceOutputPort.findAll();
  }
}
