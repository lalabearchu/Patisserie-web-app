import { CustomError } from "./CustomError";

export class UnauthorizedError extends CustomError {
  statusCode = 403;
  constructor(message: string) {
    super(message);
  }
}
