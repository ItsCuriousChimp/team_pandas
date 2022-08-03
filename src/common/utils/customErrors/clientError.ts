/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomError from "./customError";

class ClientError extends CustomError {
  errorType = this.constructor.name;
  constructor(message: string, data: any, statuscode: number) {
    super({
      message: message,
      statusCode: statuscode,
      data: data,
    });
  }
}

export default ClientError;
