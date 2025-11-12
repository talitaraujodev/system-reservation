import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import type { BookingServiceInputPort } from 'src/application/input/BookingServiceInputPort';
import type { InputCreateBookingDto } from 'src/application/input/dto/InputCreateBookingDto';
import type { InputUpdateBookingDto } from 'src/application/input/dto/InputUpdateBookingDto';
import { Booking } from 'src/domain/models/Booking';

@Controller('bookings')
export class BookingController {
  constructor(
    @Inject('BookingServiceInputPort')
    private readonly bookingServiceInputPort: BookingServiceInputPort,
  ) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: InputCreateBookingDto): Promise<Booking> {
    return await this.bookingServiceInputPort.create(body);
  }
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id')
    id: string,
    @Body() body: InputUpdateBookingDto,
  ): Promise<Booking> {
    return await this.bookingServiceInputPort.create({
      ...body,
      id,
    } as Booking);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id')
    id: string,
  ): Promise<Booking> {
    return await this.bookingServiceInputPort.findOne(id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id')
    id: string,
  ): Promise<void> {
    await this.bookingServiceInputPort.findOne(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Booking[]> {
    return await this.bookingServiceInputPort.findAll();
  }
}
