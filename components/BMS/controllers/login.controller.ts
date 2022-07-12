import { Response, Request } from "express";
import { AccountService } from "../services/login.service";
import { LoginResponsePayload } from "../../../payloads/login-response.payload";

class AccountController {
  public async getToken(req: Request, res: Response) {
    const username = req.query.username as string;
    const password = req.query.password as string;

    const accountServiceInstance = new AccountService();
    const loginResponsePayloadInstance = new LoginResponsePayload();
    const token: string | null = await accountServiceInstance.getAccountToken({
      username,
      password,
    });
    loginResponsePayloadInstance.token = token;
    res.send(loginResponsePayloadInstance);
  }
}

export const AccountControllerInstance = new AccountController();
