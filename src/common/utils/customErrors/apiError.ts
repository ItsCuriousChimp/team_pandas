/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from "./customError";

class APITokenError extends CustomError {
  constructor(message: string, data: any, err: any) {
    super({});
    this.message = err.message;
    this.stack = err.stack;
    this.statusCode = 400;
    this.data = data;
    this.errorType = message;
  }
}

export default APITokenError;
