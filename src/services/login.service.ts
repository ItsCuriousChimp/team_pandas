import { loginDto } from "../common/customTypes/login.type";
import { loginRepository } from "../repositories/login.repository";
import { createClient } from "redis";
import logger from "../common/logger/logger";
import { token } from "../common/helpers/Token";

class LoginService {
  private userId: string;
  getToken = async (query: loginDto): Promise<{ token: string }> => {
    try {
      if (await loginRepository.isValidAccount(query)) {
        this.userId = await loginRepository.getUserId(query);
        await loginRepository.updateLastLogin(this.userId);

        return { token: token.createToken(query) };
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

  getAccountToken = async (query: loginDto): Promise<{ token: string }> => {
    const loginToken = await this.getToken(query);
    const client = createClient();
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();
    await client.set(this.userId, loginToken.token);

    return loginToken;
  };
}

export const loginService = new LoginService();
