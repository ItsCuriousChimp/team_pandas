/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from "./customError";

class APIError extends CustomError {
  constructor(message: string, data: any, err: any) {
    super({
      message: message,
      stack: err.stack,
      statusCode: 400,
      data: data,
    });
    this.errorType = this.constructor.name;
  }
}

export default APIError;
