import { NextFunction, Response, Request } from "express";
import { ValidationError } from "express-validation";
import logger from "../common/logger/logger";
export const handler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    logger.error({
      message: `${err.name}`,
      error: err.details,
      statusCode: err.statusCode,
      __filename,
    });
    res.status(500).json(err);
  } else {
    logger.error({
      message: `${err.name}`,
      error: err.message,
      __filename,
    });
    res.status(500).send(err.message);
  }
};
