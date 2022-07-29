/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Response, Request } from "express";
import { ValidationError } from "express-validation";
import logger from "../common/logger/logger";
import APIRequestError from "../common/utils/customErrors/apiError";
import AuthenticationError from "../common/utils/customErrors/autheticationError";
import ClientError from "../common/utils/customErrors/clientError";
import DatabaseError from "../common/utils/customErrors/databaseError";
import HTTPError from "../common/utils/customErrors/httpError";
import RedisError from "../common/utils/customErrors/redisError";
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
  } else if (err instanceof AuthenticationError) {
    res.status(err.statusCode).send(err);
  } else if (err instanceof DatabaseError) {
    res.status(err.statusCode).send(err);
  } else if (err instanceof APIRequestError) {
    res.status(err.statusCode).send(err);
  } else if (err instanceof HTTPError) {
    res.status(err.statusCode).send(err);
  } else if (err instanceof ClientError) {
    res.status(err.statusCode).send(err);
  } else if (err instanceof RedisError) {
    res.status(err.statusCode).send(err);
  } else {
    logger.error({
      message: `${err.name}`,
      error: err.message,
      __filename,
    });
    res.status(500).send(err.message);
  }
};

export const notFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).send("Method not found");
};
