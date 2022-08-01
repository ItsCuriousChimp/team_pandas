/* eslint-disable @typescript-eslint/no-explicit-any */
class CustomError extends Error {
  data: any;
  statusCode: number;
  constructor({ message, statusCode, stack, data }: any) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode;
    this.stack = stack;
    this.data = data;
  }
}

export default CustomError;
