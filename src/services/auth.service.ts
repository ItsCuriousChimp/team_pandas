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

class AuthService {
  login = async (params: loginDto): Promise<string> => {
    const account = await accountRepository.getUserAccount(params);

    if (!account) {
      throw new AuthenticationError(params);
    }

    if (!(await bcrypt.compare(params.password, account.passwordHash))) {
      throw new AuthenticationError(params);
    }
    const userId: string = account.userId as string;
    const accessToken: string = await authHelper.createAccessToken(userId);

    await redisClient.setToken(userId, accessToken);
    await userRepository.updateLastLogin(userId);

    logger.info({
      message: "User logged in",
      data: { username: params.username },
    });

    return accessToken;
  };
}

export const authService = new AuthService();
