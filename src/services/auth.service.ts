import { authHelper } from "../common/helpers/auth.helper";
import { redisHelper } from "../common/helpers/redis.helper";
import logger from "../common/logger/logger";

export class AuthService {
  async logout(token: string): Promise<boolean> {
    try {
      //way of logging filename
      logger.info("logout", { __filename, functionName: "logout" });
      const payload = authHelper.verifyAccessToken(token);
      const resultdeletion = await redisHelper.deleteTokeninCache(payload.id);
      if (resultdeletion == 0) {
        throw new Error("log out failed");
      }
      logger.info("logout successful", {
        id: payload.id,
        __filename,
        functionName: "logout",
      });
    } catch (err) {
      console.log("log out failed");
      throw err;
    }
    return true;
  }
}
export const authService = new AuthService();
