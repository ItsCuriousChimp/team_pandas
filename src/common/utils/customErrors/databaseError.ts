/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from "./customError";

class DatabaseError extends CustomError {
  constructor(message: string, err: any, data: any) {
    super({});
    this.message = err.message;
    this.stack = err.stack;
    this.statusCode = 502;
    this.data = data;
    this.errorType = message;
  }
}
export default DatabaseError;
