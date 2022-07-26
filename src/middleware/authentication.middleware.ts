import { NextFunction, Response, Request } from "express";
import logger from "../common/logger/logger";
export const loginError = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  logger.info({
    level: "info",
    message: `${err.name}`,
  });
  return res.json(err);
};
