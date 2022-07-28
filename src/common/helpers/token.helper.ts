import * as jwt from "jsonwebtoken";
import { AccessTokenPayload } from "../../models/access.token.model";
import logger from "../logger/logger";

class TokenHelper {
  public getAccessToken = (accessTokenPayload: AccessTokenPayload): string => {
    try {
      logger.info("get access token", {
        accessTokenPayload,
        __filename,
        functionName: "getAccessToken",
      });
      const secretKey: string = process.env.SECRET_KEY as string;
      const token = jwt.sign({ id: accessTokenPayload.id }, secretKey, {
        expiresIn: "30d",
      });
      logger.info("access token created succesfully", {
        accessTokenPayload,
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
        { id: payload.id },
        __filename,
        "verifyAccessToken"
      );
      return payload;
    } catch (error) {
      console.log("incorrect access token");
      throw error;
    }
  };
}
export const tokenHelper = new TokenHelper();
