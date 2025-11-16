import { Module } from '@nestjs/common';
import { NotificationController } from './input/controllers/NotificationController';

@Module({
  controllers: [NotificationController],
})
export class AdapterModule {}
