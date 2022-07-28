import * as redis from "redis";
class RedisHelper {
  connected: boolean;
  client: redis.RedisClientType;
  constructor() {
    this.connected = false;
    this.client = redis.createClient();
  }

  getConnection() {
    if (this.connected) return this.client;

    this.client.on("connect", (err) => {
      console.log("Client connected to Redis...");
    });
    this.client.on("ready", (err) => {
      console.log("Redis ready to use");
    });
    this.client.on("error", (err) => {
      console.error("Redis Client", err);
    });
    this.client.on("end", () => {
      console.log("Redis disconnected successfully");
    });

    return this.client;
  }

  setToken = async (userId: string, token: string): Promise<void> => {
    await this.client.SET(userId, token);
  };

  setExpireAt = async (userId: string, exp: number): Promise<void> => {
    await this.client.EXPIREAT(userId, exp);
  };
  isTokeninCache = async (id: string): Promise<void> => {
    await this.client.EXISTS(id);
  };
}
export const redisHelper = new RedisHelper();
