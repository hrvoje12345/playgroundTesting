import { HttpStatusCode } from '../values/HttpStatusCode';

export class ServerError extends Error {
  status: number;

  constructor(
    message = 'Server Error',
    status = HttpStatusCode.InternalServerError,
  ) {
    super(message);
    this.status = status;
  }
}
