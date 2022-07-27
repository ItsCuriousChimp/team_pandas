import { loginDto } from "../data/dtos/login.dto";
import { accountRepository } from "../repositories/account.repository";
import { createClient } from "redis";
import logger from "../common/logger/logger";
import { token } from "../common/helpers/auth.helper";
import * as bcrypt from "bcryptjs";
import { Account } from "../models/account.model";
import { userRepository } from "../repositories/user.repository";

class AuthService {
  login = async (query: loginDto): Promise<string> => {
    try {
      const account = await accountRepository.getUserAccount(query);
      if (!account) {
        throw new Error("Invalid Username");
      }

      if (await bcrypt.compare(query.password, account.passwordHash)) {
        const accessToken: string = await this.getToken(account);
        await this.storeLoginToken(account.userId, accessToken);
        logger.info({
          message: "User logged in",
          data: { username: query.username },
        });
        return accessToken;
      } else {
        throw new Error("Invalid Password");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error({
        error: err,
        message: "Invalid credentials",
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
        message: `Error at getToken`,
        __filename,
      });
      throw err;
    }
  };

  storeLoginToken = async (userId: string, token: string): Promise<void> => {
    const client = createClient();
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();
    await client.set(userId, token);
  };
}

export const authService = new AuthService();
