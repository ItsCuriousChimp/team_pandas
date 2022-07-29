/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Response, Request } from "express";
import logger from "../common/logger/logger";
import CustomError from "../common/utils/customErrors/customError";

export const handler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  logger.error({
    message: `${err.name}`,
    error: err.message,
    __filename,
  });

  res
    .status(err instanceof CustomError ? err.statusCode : 500)
    .send(err.message);
};

export const notFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).send("Method not found");
};
