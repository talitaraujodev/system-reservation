export interface InputUpdateBookingDto {
  id: string;
  userId: string;
  resourceId: string;
  startAt: string;
  endAt: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED';
}
