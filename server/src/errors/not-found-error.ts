import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
  statusCode = 404;
  constructor(message: string) {
    super(message);
  }
}
