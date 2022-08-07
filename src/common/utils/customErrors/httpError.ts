/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from "./customError";

class HTTPError extends CustomError {
  errorType = this.constructor.name;
  constructor(message: string, err: any, data: any) {
    super({
      message: message || err.message,
      stack: err.stack,
      statusCode: 502,
      data: data,
    });
  }
}
export default HTTPError;
