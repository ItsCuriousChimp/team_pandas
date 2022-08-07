import { NextFunction, Response, Request } from "express";
import logger from "../common/logger/logger";
import { redisClient } from "../storage/redisClient";
import { authHelper } from "../common/helpers/auth.helper";
import clientError from "../common/utils/customErrors/clientError";

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  const callerMethodName = "authorize";
  try {
    if (!token) {
      throw new clientError("No token in header", null, 400);
    }
    logger.info("authorize", {
      __filename,
      functionName: callerMethodName,
    });

    const [, tokenBody] = token.split(" ");

    const payload = authHelper.verifyAccessToken(tokenBody);
    const check = await redisClient.isTokenInCache(payload.id);

    if (check == 0) {
      throw new clientError("Token doesnot exist in cache", tokenBody, 400);
    }

    logger.info("Authorization successful", {
      __filename,
      functionName: callerMethodName,
    });

    next();
  } catch (err) {
    next(err);
  }
};
