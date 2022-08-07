/* eslint-disable @typescript-eslint/no-explicit-any */
import * as jwt from "jsonwebtoken";
import logger from "../logger/logger";
import APIError from "../utils/customErrors/apiError";

class AuthHelper {
  public createAccessToken = (userId: string): string => {
    const callerMethodName = "createAccessToken";
    try {
      logger.info("get access token", {
        userId,
        __filename,
        functionName: callerMethodName,
      });

      const secretKey: string = process.env.SECRET_KEY as string;
      const token: string = jwt.sign({ id: userId }, secretKey, {
        expiresIn: "30d",
      });

      logger.info("access token created succesfully", {
        userId,
        __filename,
        functionName: callerMethodName,
      });

      return token;
    } catch (error) {
      logger.error("Unable to create token");
      throw new APIError("Unable to create token", userId, error);
    }
  };
  public verifyAccessToken = (token: string): jwt.JwtPayload => {
    const callerMethodName = "verifyAccessToken";
    try {
      logger.info("Verify access token", {
        __filename,
        functionName: callerMethodName,
      });
      const secretKey: string = process.env.SECRET_KEY as string;
      const payload: jwt.JwtPayload = jwt.verify(
        token,
        secretKey
      ) as jwt.JwtPayload;

      logger.info("Access token verified successfully", {
        id: payload.id,
        __filename,
        functionName: callerMethodName,
      });

      return payload;
    } catch (error) {
      logger.error("Incorrect access token");
      throw new APIError("Unable to verify token", token, error);
    }
  };
}
export const authHelper = new AuthHelper();
