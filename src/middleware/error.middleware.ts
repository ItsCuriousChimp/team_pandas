import { NextFunction, Response, Request } from "express";
import logger from "../common/logger/logger";
export const cityQueryError = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  logger.error({
    level: "error",
    message: `${err.name}`,
  });
  return res.status(422).json(err);
};
