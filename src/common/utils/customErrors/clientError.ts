/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomError from "./customError";

class ClientError extends CustomError {
  constructor(message: string, err: any) {
    super({
      message: err.message,
      errorType: message,
      stack: err.stack,
      statusCode: err.status,
    });
    this.errorType = this.constructor.name;
  }
}

export default ClientError;
