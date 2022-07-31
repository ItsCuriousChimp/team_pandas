/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from "./customError";

class RedisError extends CustomError {
  errorType: string;
  constructor(message: string, err: any) {
    super({});
    this.message = err.message;
    this.errorType = message;
    this.stack = err.stack;
    this.statusCode = err.status;
  }
}

export default RedisError;
