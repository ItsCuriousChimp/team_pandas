import { userRepository } from "../repositories/user.repository";
import { AccountRepository } from "../repositories/account.repository";
import { signupDto } from "../common/customTypes/signup.type";
import { Account } from "../models/account.model";
import { hashHelper } from "../common/helpers/hash.helper";
import { tokenHelper } from "../common/helpers/token.helper";
import { AccessTokenPayload } from "../models/access-token.model";
import { redisClient } from "../common/helpers/init_redis";

(async () => {
  await redisClient.connect();
  return redisClient;
})();

export class AuthService {
  async createUser(query: signupDto): Promise<string | null> {
    const accountRepository = new AccountRepository(query.username);
    const isAccountExists = accountRepository.getAccount();
    if (isAccountExists != null) {
      return null;
    }
    const passwordHash: string = await hashHelper.generateHash(query.password);
    const accountId: string = await accountRepository.CreateAccount(
      passwordHash
    );
    //need to filter out query so that only required fields are sent
    const userId: string = await userRepository.createUser(query);
    const account: Account = await accountRepository.updateAccountWithUserId(
      accountId,
      userId
    );
    const accessTokenPayload = new AccessTokenPayload(account.userId);
    const token = tokenHelper.getAccessToken(accessTokenPayload);
    const addToken = async (token: string) => {
      try {
        await redisClient.SET(userId, token); // set the JWT as the key and its value as valid
        const payload = tokenHelper.verifyAccessToken(token); // verifies and decode the jwt to get the expiration date
        await redisClient.EXPIREAT(userId, +payload.exp); // sets the token expiration date to be removed from the cache
        return;
      } catch (err) {
        console.log("could not set token in redis");
        throw err;
      }
    };

    return token;
  }
  async logoutUser(token: string): Promise<boolean> {
    const payload = tokenHelper.verifyAccessToken(token);
    const resultdeletion = await redisClient.DEL(payload.id);
    if (resultdeletion == 1) {
      return true;
    } else {
      return false;
    }
  }
}
export const authService = new AuthService();
