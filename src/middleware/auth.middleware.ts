import { NextFunction, Response, Request } from "express";
import logger from "../common/logger/logger";
import { tokenHelper } from "../common/helpers/token.helper";
import { redisClient } from "../common/helpers/init_redis";
import { AppError } from "../common/utils/error";
export const authorize = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    // return res.status(401).json({ error: new Error("access denied") });
    throw new AppError(401, "No Token in header - access denied");
  }
  try {
    // Validate JWT
    // remove bearer
    const [, tokenBody] = token.split(" ");

    const payload = tokenHelper.verifyAccessToken(tokenBody);

    const check = await redisClient.EXISTS(payload.id); // check if token exists in cache already
    if (check == 0) {
      throw new AppError(401, "Token doesnot exist in cache");
    }
  } catch (err) {
    // res.status(400).json({ message :"invalid token" });
    throw new AppError(401, "invalid token");
  }
};
