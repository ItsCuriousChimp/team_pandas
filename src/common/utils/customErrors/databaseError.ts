/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from "./customError";

class DatabaseError extends CustomError {
  errorType = this.constructor.name;
  constructor(message: string, err: any, data: any) {
    super({
      message: message || err.message,
      statusCode: 502,
      stack: err?.stack,
      data: data,
    });
  }
}
export default DatabaseError;
