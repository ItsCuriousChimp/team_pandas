import * as redis from "redis";
import logger from "../common/logger/logger";
import RedisError from "../common/utils/customErrors/redisError";

class RedisClient {
  connected: boolean;
  client: redis.RedisClientType;

  constructor() {
    this.connected = false;
    this.client = redis.createClient();
    this.client
      .connect()
      .then(() => {
        logger.info({ message: "Redis client connected" });
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
      .catch((err: any) =>
        logger.error({ message: "Redis client connection issue", error: err })
      );
  }

  setToken = async (userId: string, token: string): Promise<void> => {
    try {
      await this.client.SET(userId, token);
    } catch (err) {
      logger.error({
        message: "Unable to store token",
        __filename,
      });
      throw new RedisError("Unable to store token", err);
    }
  };

  setExpireAt = async (userId: string, exp: number): Promise<void> => {
    try {
      await this.client.EXPIREAT(userId, exp);
    } catch (err) {
      logger.error({
        message: "Unable to set expiry date",
        error: err,
        __filename,
      });
      throw new RedisError("Unable to set expiry date", err);
    }
  };

  isTokenInCache = async (userId: string): Promise<number> => {
    try {
      const isTokenAvailable: number = await this.client.EXISTS(userId);
      logger.info(isTokenAvailable);

      return isTokenAvailable;
    } catch (err) {
      logger.error({
        message: "Unable to find token",
        error: err,
        __filename,
      });

      throw new RedisError("Unable to find token", err);
    }
  };

  deleteTokenInCache = async (id: string): Promise<number> => {
    try {
      return await this.client.DEL(id);
    } catch (err) {
      logger.error({
        message: "Unable to delete token from redis",
        error: err,
        __filename,
      });
      throw new RedisError("Unable to delete token from redis", err);
    }
  };
}

export const redisClient = new RedisClient();
