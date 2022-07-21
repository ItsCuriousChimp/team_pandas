import * as jwt from "jsonwebtoken";
import logger from "../logger/logger";

class Token {
  createToken = (params: object): string => {
    try {
      const privateKey: string = process.env.PRIVATE_KEY as string;
      const token: string = jwt.sign(params, privateKey, { expiresIn: "30d" });
      logger.info({
        level: "info",
        message: "access token created",
      });
      return token;
    } catch (err) {
      logger.info({
        level: "2",
        message: `Error in generating token ${err}`,
      });
      throw err;
    }
  };
}

export const token = new Token();
