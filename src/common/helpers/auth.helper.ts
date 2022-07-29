import * as jwt from "jsonwebtoken";
import logger from "../logger/logger";
import APIRequestError from "../utils/customErrors/apiError";

class Token {
  createToken = (query: {
    username: string;
    passwordHash: string;
    userId: string;
  }): string => {
    try {
      const secretKey: string = process.env.SECRET_KEY as string;
      const token: string = jwt.sign(query, secretKey, { expiresIn: "30d" });
      logger.info({
        message: "access token created",
        data: query,
      });
      return token;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error({
        message: `Error in generating token`,
        error: err.message,
        __filename,
      });
      throw new APIRequestError("Cannot generate token", query, err);
    }
  };
}

export const token = new Token();
