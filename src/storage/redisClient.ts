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
        message: "Cannot store token",
        __filename,
      });
      throw new RedisError("Cannot store token", err);
    }
  };

  setExpireAt = async (userId: string, exp: number): Promise<void> => {
    try {
      await this.client.EXPIREAT(userId, exp);
    } catch (err) {
      logger.error({
        message: "Cannot set expiry date",
        error: err,
        __filename,
      });
      throw new RedisError("Cannot set expiry date", err);
    }
  };

  isTokenInCache = async (id: string): Promise<number> => {
    try {
      return await this.client.EXISTS(id);
    } catch (err) {
      logger.error({
        message: "Cannot find token",
        error: err,
        __filename,
      });
      throw new RedisError("Cannot find token", err);
    }
  };

  deleteTokenInCache = async (id: string): Promise<number> => {
    try {
      return await this.client.DEL(id);
    } catch (err) {
      logger.error({
        message: "Cannot delete token from redis",
        error: err,
        __filename,
      });
      throw new RedisError("Cannot delete token from redis", err);
    }
  };
}

export const redisClient = new RedisClient();
