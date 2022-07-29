import * as redis from "redis";
import logger from "../common/logger/logger";
import RedisError from "../common/utils/customErrors/redisError";
class RedisHelper {
  connected: boolean;
  client: redis.RedisClientType;
  constructor() {
    this.connected = false;
    this.client = redis.createClient();
  }

  getConnection() {
    if (this.connected) return this.client;

    this.client.on("connect", () => {
      logger.info({ message: "Client connected to Redis..." });
    });
    this.client.on("ready", () => {
      logger.info({
        message: "Redis ready to use",
      });
    });
    this.client.on("error", (err) => {
      logger.error("Redis Client", err);
    });
    this.client.on("end", () => {
      logger.info("Redis disconnected successfully");
    });

    return this.client;
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
        __filename,
      });
      throw new RedisError("Cannot set expiry date", err);
    }
  };
  isTokeninCache = async (id: string): Promise<number> => {
    try {
      return await this.client.EXISTS(id);
    } catch (err) {
      logger.error({
        message: "Cannot find token",
        __filename,
      });
      throw new RedisError("Cannot find token", err);
    }
  };
  deleteTokeninCache = async (id: string): Promise<number> => {
    try {
      return await this.client.DEL(id);
    } catch (err) {
      logger.error({
        message: "Cannot delete token from redis",
        __filename,
      });
      throw new RedisError("Cannot delete token from redis", err);
    }
  };
}
export const redisHelper = new RedisHelper();
