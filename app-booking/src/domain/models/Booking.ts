import Joi from 'joi';

export class Booking {
  private _id: string;
  private _userId: string;
  private _resourceId: string;
  private _startAt: string;
  private _endAt: string;
  private _status: 'PENDING' | 'CONFIRMED' | 'CANCELED';
  private bookingSchema = Joi.object({
    userId: Joi.string().required(),
    resourceId: Joi.string().required(),
    startAt: Joi.string().required(),
    endAt: Joi.string().required(),
  });

  constructor(
    id: string,
    userId: string,
    resourceId: string,
    startAt: string,
    endAt: string,
    status?: 'PENDING' | 'CONFIRMED' | 'CANCELED',
  ) {
    this._id = id;
    this._userId = userId;
    this._resourceId = resourceId;
    this._startAt = startAt;
    this._endAt = endAt;
    this._status = status || 'PENDING';
  }

  confirm() {
    this._status = 'CONFIRMED';
  }

  cancel() {
    this._status = 'CANCELED';
  }

  get id() {
    return this._id;
  }

  get userId() {
    return this._userId;
  }

  get resourceId() {
    return this._resourceId;
  }

  get startAt() {
    return this._startAt;
  }

  get endAt() {
    return this._endAt;
  }

  get status() {
    return this._status;
  }
  set userId(value: string) {
    this._userId = value;
  }

  set resourceId(value: string) {
    this._resourceId = value;
  }

  set startAt(value: string) {
    this._startAt = value;
  }

  set endAt(value: string) {
    this._endAt = value;
  }

  set status(value: 'PENDING' | 'CONFIRMED' | 'CANCELED') {
    this._status = value;
  }

  validate() {
    const data = {
      userId: this.userId,
      resourceId: this.resourceId,
      startAt: this.startAt,
      endAt: this.endAt,
    };
    const { error } = this.bookingSchema.validate(data);
    return error ? error.message : false;
  }
}
