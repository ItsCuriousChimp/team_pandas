/* eslint-disable @typescript-eslint/no-explicit-any */
import * as bcrypt from "bcryptjs";
import { loginDto } from "../data/dtos/login.dto";
import { userRepository } from "../repositories/user.repository";
import { accountRepository } from "../repositories/account.repository";
import AuthenticationError from "../common/utils/customErrors/autheticationError";
import { redisClient } from "../storage/redisClient";
import { authHelper } from "../common/helpers/auth.helper";
import logger from "../common/logger/logger";

class AuthService {
  login = async (params: loginDto): Promise<string> => {
    try {
      const account = await accountRepository.getUserAccount(params);

      if (!account) {
        throw new AuthenticationError("Invalid Username", params);
      }

      if (!(await bcrypt.compare(params.password, account.passwordHash))) {
        throw new AuthenticationError("Invalid Password", params);
      }

      const accessToken: string = await authHelper.createAccessToken(
        account.userId
      );

      await redisClient.setToken(account.userId, accessToken);
      await userRepository.updateLastLogin(account.userId);

      logger.info({
        message: "User logged in",
        data: { username: params.username },
      });

      return accessToken;
    } catch (err: any) {
      logger.error({
        error: err,
        message: "Cannot login user.",
        status: err.statusCode,
        __filename,
      });

      throw err;
    }
  };
}

export const authService = new AuthService();
