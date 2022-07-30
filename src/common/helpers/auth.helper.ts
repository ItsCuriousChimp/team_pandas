/* eslint-disable @typescript-eslint/no-explicit-any */
import * as jwt from "jsonwebtoken";
import { Account } from "../../models/account.model";
import logger from "../logger/logger";

class AuthHelper {
  public createAccessToken = (userId: string): string => {
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
      logger.info("token could not be created");
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
      logger.info("Incorrect access token");
      throw error;
    }
  };
  public getToken = async (account: Account): Promise<string> => {
    try {
      return this.createAccessToken(account.userId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error({
        status: err.status,
        message: `Unable to generate token`,
        __filename,
      });

      throw err;
    }
  };
}
export const authHelper = new AuthHelper();
