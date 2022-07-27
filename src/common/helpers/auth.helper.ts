import * as jwt from "jsonwebtoken";
import logger from "../logger/logger";

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
        __filename,
      });
      return token;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error({
        message: `Error in generating token`,
        error: err.message,
        __filename,
      });
      throw err;
    }
  };
}

export const token = new Token();
