// import { RedisClientType } from "@redis/client";
import * as redis from "redis";

// class Redis {
//     connected: boolean;
//     client: RedisClientType | null;
//     constructor() {
//       this.connected = false;
//       this.client = null;
//     }

//     getConnection() {
//       if (this.connected) return this.client;

//       this.client = redis.createClient();

//       this.client.on("connect", (err) => {
//         console.log("Client connected to Redis...");
//       });
//       this.client.on("ready", (err) => {
//         console.log("Redis ready to use");
//       });
//       this.client.on("error", (err) => {
//         console.error("Redis Client", err);
//       });
//       this.client.on("end", () => {
//         console.log("Redis disconnected successfully");
//       });

//       return this.client;
//     }
//   };

// export const redisconfig = new Redis().getConnection();

// (async () => {
//     await redis.connect();
//     return redis;
//   })();

// export const redisconfig = ()=>{
//        const client = redis.createClient();
//        client.on("connect", (err) => {
//            console.log("Client connected to Redis...");
//        });
//        client.on("ready", (err) => {
//            console.log("Redis ready to use");
//        });
//        client.on("error", (err) => {
//            console.error("Redis Client", err);
//        });
//        client.on("end", () => {
//            console.log("Redis disconnected successfully");
//        });
//        return client;

//    };

// const client = redis.createClient();
// client.on("connect", (err) => {
//     console.log("Client connected to Redis...");
// });
// client.on("ready", (err) => {
//     console.log("Redis ready to use");
// });
// client.on("error", (err) => {
//     console.error("Redis Client", err);
// });
// client.on("end", () => {
//     console.log("Redis disconnected successfully");
// });
// export const redisClient = client;

export const redisClient = (function () {
  const client = redis.createClient();
  client.on("connect", (err) => {
    console.log("Client connected to Redis...");
  });
  client.on("ready", (err) => {
    console.log("Redis ready to use");
  });
  client.on("error", (err) => {
    console.error("Redis Client", err);
  });
  client.on("end", () => {
    console.log("Redis disconnected successfully");
  });
  // await client.connect();
  return client;
})();
