/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from "./customError";

class HTTPError extends CustomError {
  errorType = this.constructor.name;
  constructor(message: string, err: any) {
    super({
      message: message || err.message,
      stack: err.stack,
      statusCode: err.status,
    });
  }
}
export default HTTPError;
