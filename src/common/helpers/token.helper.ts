/*eslint no-useless-catch: "error"*/

import * as jwt from "jsonwebtoken";
import logger from "../logger/logger";
import { AccessTokenPayload } from "../../models/access-token.model";
// import {AccessTokenResponsePayload} from "../../payloads/accessToken-response.payload"
class TokenHelper {
  public getAccessToken = (AccessTokenPayload: AccessTokenPayload): string => {
    try {
      const secretKey: string = process.env.SECRET_KEY as string;
      const token = jwt.sign({ AccessTokenPayload }, secretKey, {
        expiresIn: "30d",
      });
      logger.info({
        level: "info",
        message: "access token created",
      });
      return token;
    } catch (error) {
      console.log("incorrect could not be created");
      throw error;
    }
  };
  public verifyAccessToken = (token: string): any => {
    try {
      const secretKey: string = process.env.SECRET_KEY as string;
      const payload = jwt.verify(token, secretKey) as jwt.JwtPayload;
      logger.info({
        level: "info",
        message: "access token Verified",
      });

      return payload;
    } catch (error) {
      // throw new Error(error);
      console.log("incorrect access token");
      throw error;
    }
  };
}
export const tokenHelper = new TokenHelper();
