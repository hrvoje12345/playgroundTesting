import { HttpStatusCode } from '../values/HttpStatusCode';

export class Unauthorized extends Error {
  status: number;

  constructor(message = 'Unauthorized', status = HttpStatusCode.Unauthorized) {
    super(message);
    this.status = status;
  }
}
