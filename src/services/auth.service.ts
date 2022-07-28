import { tokenHelper } from "../common/helpers/token.helper";
import { redisHelper } from "../common/helpers/redis.helper";
import logger from "../common/logger/logger";

export class AuthService {
  async logout(token: string): Promise<boolean> {
    logger.info("logout", __filename, "logout");
    const payload = tokenHelper.verifyAccessToken(token);
    const resultdeletion = await redisHelper.deleteTokeninCache(payload.id);
    if (resultdeletion != 1) {
      return false;
    }
    logger.info("logout successful", { id: payload.id }, __filename, "logout");
    return true;
  }
}
export const authService = new AuthService();
