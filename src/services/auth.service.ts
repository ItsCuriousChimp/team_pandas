/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as bcrypt from "bcryptjs";
import { loginDto } from "../data/dtos/login.dto";
import { userRepository } from "../repositories/user.repository";
import { accountRepository } from "../repositories/account.repository";
import AuthenticationError from "../common/utils/customErrors/authenticationError";
import { redisClient } from "../storage/redisClient";
import { authHelper } from "../common/helpers/auth.helper";
import logger from "../common/logger/logger";
import { signupDto } from "../data/dtos/signup.dto";
import { Account } from "../models/account.model";
import { hashHelper } from "../common/helpers/hash.helper";
import { cityRepository } from "../repositories/city.repository";
import clientError from "../common/utils/customErrors/clientError";

export class AuthService {
  isCityIdValid = async (id: string): Promise<boolean> => {
    try {
      logger.info("is CityId Valid", {
        cityId: id,
        __filename,
        functionName: "isCityIdValid",
      });
      const getCityId: string | null = await cityRepository.getCityId(id);
      if (getCityId == null) {
        throw new clientError("city id doesnot exist", id, 422);
      } else {
        return true;
      }
    } catch (err) {
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
      await redisClient.setToken(userId, token); // set the JWT as the key and its value as valid
      const payload = authHelper.verifyAccessToken(token); // verifies and decode the jwt to get the expiration date
      const exp = payload.exp as number;
      await redisClient.setExpireAt(userId, exp); // sets the token expiration date to be removed from the cache
      logger.info("token storing successful", {
        userId,
        __filename,
        functionName: "storeToken",
      });
    } catch (err) {
      throw err;
    }
  };

  registerUser = async (params: signupDto): Promise<string | null> => {
    try {
      logger.info("register user", {
        query: params,
        __filename,
        functionName: "registerUser",
      });
      const account: Account | null = await accountRepository.getAccount(
        params.username
      );
      if (account) {
        throw new clientError(
          "account with entered username already exists",
          params.username,
          409
        );
      }
      //If city entered in sign up form then check if that city is in DB
      if (params.cityId) {
        await this.isCityIdValid(params.cityId);
      }

      const passwordHash: string = await hashHelper.generateHash(
        params.password
      );
      const accountId: string = await accountRepository.createAccount(
        params.username,
        passwordHash
      );
      const userId: string = await userRepository.createUser(params);
      await accountRepository.updateAccountWithUserId(accountId, userId);
      const token = authHelper.createAccessToken(userId);

      await this.storeToken(token, userId);
      logger.info("register user successful", {
        userId,
        __filename,
        functionName: "registerUser",
      });
      return token;
    } catch (err) {
      throw err;
    }
  };
  login = async (params: loginDto): Promise<string> => {
    try {
      const account: Account | null = await accountRepository.getAccount(
        params.username
      );
      if (!account) {
        throw new AuthenticationError(params);
      }
      if (!(await bcrypt.compare(params.password, account.passwordHash))) {
        throw new AuthenticationError(params);
      }
      const userId = account.userId as string;
      const accessToken: string = authHelper.createAccessToken(userId);
      await this.storeToken(accessToken, userId);
      await userRepository.updateLastLogin(userId);

      logger.info({
        message: "User logged in",
        data: { username: params.username },
      });

      return accessToken;
    } catch (err) {
      throw err;
    }
  };
}

export const authService = new AuthService();
