/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from "./customError";

class APIError extends CustomError {
  errorType = this.constructor.name;
  constructor(message: string, data: any, err: any) {
    super({
      message: message,
      stack: err.stack,
      statusCode: 400,
      data: data,
    });
  }
}

export default APIError;
