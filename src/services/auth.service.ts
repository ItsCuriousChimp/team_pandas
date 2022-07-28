import { userRepository } from "../repositories/user.repository";
import { AccountRepository } from "../repositories/account.repository";
import { signupDto } from "../common/customTypes/signup.type";
import { Account } from "../models/account.model";
import { hashHelper } from "../common/helpers/hash.helper";
import { tokenHelper } from "../common/helpers/token.helper";
import { AccessTokenPayload } from "../models/access-token.model";
import { redisClient } from "../common/helpers/init_redis";
import logger from "../common/logger/logger";

(async () => {
  await redisClient.connect();
  return redisClient;
})();

export class AuthService {
  storeToken = async (token: string, userId: string): Promise<void> => {
    try {
      logger.info(
        "store token in redis",
        { token, userId },
        __filename,
        "storeToken"
      );
      await redisClient.SET(userId, token); // set the JWT as the key and its value as valid
      const payload = tokenHelper.verifyAccessToken(token); // verifies and decode the jwt to get the expiration date
      await redisClient.EXPIREAT(userId, +payload.exp); // sets the token expiration date to be removed from the cache
      logger.info(
        "token storing successful",
        { token, userId },
        __filename,
        "storeToken"
      );
    } catch (err) {
      throw new Error("could not set token in redis");
    }
  };

  registerUser = async (query: signupDto): Promise<string | null> => {
    try {
      logger.info("register user", { query }, __filename, "registerUser");
      const accountRepository = new AccountRepository(query.username);
      const isAccountinDB = accountRepository.getAccount();
      if ((await isAccountinDB) != null) {
        throw new Error("Account Already exists");
      }

      // Need to wrap
      const passwordHash: string = await hashHelper.generateHash(
        query.password
      );
      const accountId: string = await accountRepository.createAccount(
        passwordHash
      );
      //need to filter out query so that only required fields are sent
      const userId: string = await userRepository.createUser(query);
      const account: Account = await accountRepository.updateAccountWithUserId(
        accountId,
        userId
      );
      // Need to wrap

      const accessTokenPayload = new AccessTokenPayload(userId);
      const token = tokenHelper.getAccessToken(accessTokenPayload);

      await this.storeToken(token, userId);
      logger.info(
        "register user successful",
        { userId },
        __filename,
        "registerUser"
      );
      return token;
    } catch (err) {
      console.log("error in registering user");
      throw err;
    }
  };
}
export const authService = new AuthService();
