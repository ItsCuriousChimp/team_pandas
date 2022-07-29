import * as jwt from "jsonwebtoken";
import logger from "../logger/logger";

class AuthHelper {
  public getAccessToken = (userId: string): string => {
    try {
      logger.info("get access token", {
        userId,
        __filename,
        functionName: "getAccessToken",
      });
      const secretKey: string = process.env.SECRET_KEY as string;
      const token = jwt.sign({ id: userId }, secretKey, {
        expiresIn: "30d",
      });
      logger.info("access token created succesfully", {
        userId,
        __filename,
        functionName: "getAccessToken",
      });
      return token;
    } catch (error) {
      console.log("token could not be created");
      throw error;
    }
  };
  public verifyAccessToken = (token: string): any => {
    try {
      logger.info("verify access token", {
        __filename,
        functionName: "verifyAccessToken",
      });
      const secretKey: string = process.env.SECRET_KEY as string;
      const payload = jwt.verify(token, secretKey) as jwt.JwtPayload;

      logger.info(
        "access token verified successfully",
        { userId: payload.id },
        __filename,
        "verifyAccessToken"
      );
      return payload;
    } catch (error) {
      // throw new Error(error);
      console.log("incorrect access token");
      throw error;
    }
  };
}
export const authHelper = new AuthHelper();
