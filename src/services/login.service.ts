import { loginDto } from "../common/customTypes/login.type";
import { loginRepository } from "../repositories/login.repository";
import { createClient } from "redis";
import logger from "../common/logger/logger";
import { token } from "../common/helpers/token";

class LoginService {
  private userId: string;
  getToken = async (query: loginDto): Promise<{ token: string }> => {
    try {
      if (await loginRepository.isValidAccount(query)) {
        this.userId = await loginRepository.getUserId(query);
        await loginRepository.updateLastLogin(this.userId);
        const loginToken = token.createToken(query);
        this.storeLoginToken(loginToken);
        return { token: loginToken };
      }
      throw new Error("Invalid credentials");
    } catch (err) {
      logger.info({
        level: "1",
        message: `Error at getToken ${err}`,
      });
      throw err;
    }
  };

  storeLoginToken = async (token: string): Promise<void> => {
    const client = createClient();
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();
    await client.set(this.userId, token);
  };
}

export const loginService = new LoginService();
