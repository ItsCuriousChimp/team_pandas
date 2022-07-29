import CustomError from "./customError";

class ClientError extends CustomError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: string, err: any) {
    super({});
    this.message = err.message;
    this.errorType = message;
    this.stack = err.stack;
    this.statusCode = err.status;
  }
}

export default ClientError;
