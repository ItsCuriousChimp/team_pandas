import { userRepository } from "../repositories/user.repository";
import { AccountRepository } from "../repositories/account.repository";
import { signupDto } from "../data/dtos/signup.dto";
import { Account } from "../models/account.model";
import { hashHelper } from "../common/helpers/hash.helper";
import { authHelper } from "../common/helpers/auth.helper";
import { redisHelper } from "../common/helpers/redis.helper";
import { cityRepository } from "../repositories/city.repository";
import logger from "../common/logger/logger";

export class AuthService {
  isCityIdValid = async (id: string): Promise<boolean> => {
    try {
      logger.info("is CityId Valid", {
        cityId: id,
        __filename,
        functionName: "isCityIdValid",
      });
      const getCityId: string | null = await cityRepository.getCityId(id);
      if ((await getCityId) == null) {
        throw new Error("City id incorrect");
      } else {
        return true;
      }
    } catch (err) {
      console.log("unable to get city id");
      throw err;
    }
  };

  storeToken = async (token: string, userId: string): Promise<void> => {
    try {
      logger.info("store token in redis", {
        userId,
        __filename,
        functionName: "storeToken",
      });
      await redisHelper.setToken(userId, token); // set the JWT as the key and its value as valid
      const payload = authHelper.verifyAccessToken(token); // verifies and decode the jwt to get the expiration date
      await redisHelper.setExpireAt(userId, +payload.exp); // sets the token expiration date to be removed from the cache
      logger.info("token storing successful", {
        userId,
        __filename,
        functionName: "storeToken",
      });
    } catch (err) {
      throw new Error("could not set token in redis");
    }
  };

  registerUser = async (query: signupDto): Promise<string | null> => {
    try {
      logger.info("register user", {
        query,
        __filename,
        functionName: "registerUser",
      });
      const accountRepository = new AccountRepository(query.username);
      const isAccountinDB = accountRepository.getAccount();
      if ((await isAccountinDB) != null) {
        throw new Error("Account Already exists");
      }
      //If city entered in sign up form then check if that city is in DB
      if (query.cityId) {
        await this.isCityIdValid(query.cityId);
      }

      // Need to wrap
      const passwordHash: string = await hashHelper.generateHash(
        query.password
      );
      const accountId: string = await accountRepository.createAccount(
        passwordHash
      );
      const userId: string = await userRepository.createUser(query);
      const account: Account = await accountRepository.updateAccountWithUserId(
        accountId,
        userId
      );
      // Need to wrap
      const token = authHelper.getAccessToken(userId);

      await this.storeToken(token, userId);
      logger.info("register user successful", {
        userId,
        __filename,
        functionName: "registerUser",
      });
      return token;
    } catch (err) {
      console.log("error in registering user");
      throw err;
    }
  };
}
export const authService = new AuthService();
