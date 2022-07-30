import * as bcrypt from "bcryptjs";
import { loginDto } from "../data/dtos/login.dto";
import { accountRepository } from "../repositories/account.repository";
import logger from "../common/logger/logger";
import { userRepository } from "../repositories/user.repository";
import AuthenticationError from "../common/utils/customErrors/autheticationError";
import { redisClient } from "../storage/redisClient";
import { authHelper } from "../common/helpers/auth.helper";

class AuthService {
  login = async (query: loginDto): Promise<string> => {
    try {
      const account = await accountRepository.getUserAccount(query);
      if (!account) {
        throw new AuthenticationError("Invalid Username", query);
      }

      if (!(await bcrypt.compare(query.password, account.passwordHash))) {
        throw new AuthenticationError("Invalid Password", query);
      }

      const accessToken: string = await authHelper.getToken(account);
      await redisClient.setToken(account.userId, accessToken);
      await userRepository.updateLastLogin(account.userId);
      logger.info({
        message: "User logged in",
        data: { username: query.username },
      });

      return accessToken;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error({
        error: err,
        message: "Server error. Cannot login user.",
        status: err.statusCode,
        __filename,
      });
      throw err;
    }
  };
}

export const authService = new AuthService();
