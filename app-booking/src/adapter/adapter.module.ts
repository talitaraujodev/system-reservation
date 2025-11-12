import { Module } from '@nestjs/common';
import { BookingController } from './input/controllers/BookingController';

@Module({
  controllers: [BookingController],
})
export class AdapterModule {}
