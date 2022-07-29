import { loginDto } from "../data/dtos/login.dto";
import { accountRepository } from "../repositories/account.repository";
import logger from "../common/logger/logger";
import { token } from "../common/helpers/auth.helper";
import * as bcrypt from "bcryptjs";
import { Account } from "../models/account.model";
import { userRepository } from "../repositories/user.repository";
import AuthenticationError from "../common/utils/customErrors/autheticationError";
import { redisHelper } from "../common/helpers/redis.helper";

class AuthService {
  login = async (query: loginDto): Promise<string> => {
    try {
      const account = await accountRepository.getUserAccount(query);
      if (!account) {
        throw new AuthenticationError("Invalid Username", query);
      } else if (await bcrypt.compare(query.password, account.passwordHash)) {
        const accessToken: string = await this.getToken(account);
        await redisHelper.setToken(account.userId, accessToken);
        logger.info({
          message: "User logged in",
          data: { username: query.username },
        });
        return accessToken;
      } else {
        throw new AuthenticationError("Invalid Password", query);
      }
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

  getToken = async (account: Account): Promise<string> => {
    try {
      await userRepository.updateLastLogin(account.userId);
      return token.createToken(account);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error({
        status: err.status,
        message: `Cannot generate Token`,
        __filename,
      });
      throw err;
    }
  };
}

export const authService = new AuthService();
