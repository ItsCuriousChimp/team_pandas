import { loginDto } from "../common/customTypes/login.type";
import { authRepository } from "../repositories/login.repository";
import { createClient } from "redis";
import logger from "../common/logger/logger";
import { token } from "../common/helpers/auth.helper.ts";
import * as bcrypt from "bcryptjs";

class AuthService {
  login = async (query: loginDto): Promise<string> => {
    try {
      const accounts = await authRepository.getUserAccount(query);
      if (accounts.length) {
        if (await bcrypt.compare(query.password, accounts[0].passwordHash)) {
          const accessToken: string = await this.getToken(accounts[0]);
          await this.storeLoginToken(accounts[0].userId, accessToken);
          return accessToken;
        }
        throw new Error("Invalid Credentals");
      }
      throw new Error("Invalid Credentals");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error({
        error: err,
        message: "Invalid credentials",
        status: err.statusCode,
      });
      throw err;
    }
  };

  getToken = async (account: {
    username: string;
    passwordHash: string;
    userId: string;
  }): Promise<string> => {
    try {
      await authRepository.updateLastLogin(account.userId);
      return token.createToken(account);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error({
        status: err.status,
        message: `Error at getToken ${err}`,
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
