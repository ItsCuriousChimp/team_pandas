/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from "./customError";

class DatabaseError extends CustomError {
  constructor(message: string, err: any, data: any) {
    super({
      message: message,
      stack: err.stack,
      statusCode: 502,
      data: data,
    });

    this.errorType = this.constructor.name;
  }
}
export default DatabaseError;
