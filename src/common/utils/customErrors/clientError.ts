/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomError from "./customError";

class ClientError extends CustomError {
  errorType = this.constructor.name;
  constructor(message: string, data: any, statuscode: number, err?: any) {
    super({
      message: message || err.message,
      statusCode: statuscode,
      stack: err?.stack,
      data: data,
    });
  }
}

export default ClientError;
