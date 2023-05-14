import { CustomError } from "./CustomError";

export class UnauthenticatedError extends CustomError {
  statusCode = 401;
  constructor(message: string) {
    super(message);
  }
}
