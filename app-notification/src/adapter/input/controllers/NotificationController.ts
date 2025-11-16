import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import type { NotificationServiceInputPort } from 'src/application/input/NotificationServiceInputPort';


@Controller('notifications')
export class NotificationController {
  constructor(
    @Inject('NotificationServiceInputPort')
    private readonly notificationServiceInputPort: NotificationServiceInputPort,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handleBookingFindAll(): Promise<void> {
    await this.notificationServiceInputPort.handleBookingCreated();
  }
}
