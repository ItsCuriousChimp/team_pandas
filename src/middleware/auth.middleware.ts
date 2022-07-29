import { NextFunction, Response, Request } from "express";
import logger from "../common/logger/logger";
import { authHelper } from "../common/helpers/auth.helper";
import { redisHelper } from "../common/helpers/redis.helper";

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new Error("No Token in header - access denied");
  }
  try {
    logger.info("authorize", {
      __filename,
      functionName: "authorize",
    });

    // Validate JWT
    // remove bearer
    const [, tokenBody] = token.split(" ");
    const payload = authHelper.verifyAccessToken(tokenBody);
    const check = await redisHelper.isTokeninCache(payload.id); // check if token exists in cache already
    if (check == 0) {
      throw new Error("Token doesnot exist in cache");
    }

    logger.info("authorization successful", {
      __filename,
      functionName: "authorize",
    });

    next();
  } catch (err) {
    console.log("unauthorized user");
    next(err);
  }
};
