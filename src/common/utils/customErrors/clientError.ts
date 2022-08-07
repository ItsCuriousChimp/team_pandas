/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomError from "./customError";

class ClientError extends CustomError {
  errorType = this.constructor.name;
  constructor(message: string, err: any) {
    super({
      message: err.message,
      stack: err.stack,
      statusCode: err.status,
    });
  }
}

export default ClientError;
