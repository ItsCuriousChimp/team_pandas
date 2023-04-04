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
import { User } from "../models/user.model";

class AuthService {
  isCityIdValid = async (id: string): Promise<boolean> => {
    try {
      logger.info("is CityId Valid", {
        data: { cityId: id },
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
        data: { userId },
        __filename,
        functionName: "storeToken",
      });
      const tokenPayload = authHelper.verifyAccessToken(token);
      const exp = tokenPayload.exp as number;
      await redisClient.setToken(userId, token, exp);
      logger.info("token storing successful", {
        data: { userId },
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
        data: params,
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

      await this.isCityIdValid(params.cityId);

      const passwordHash: string = await hashHelper.generateHash(
        params.password
      );
      const accountId: string = await accountRepository.createAccount(
        params.username,
        passwordHash
      );
      const user: User = await userRepository.createUser(params);
      await accountRepository.updateAccountWithUserId(accountId, user.id);
      const token = authHelper.createAccessToken(user.id);

      await this.storeToken(token, user.id);
      logger.info("register user successful", {
        data: { UserId: user.id },
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
