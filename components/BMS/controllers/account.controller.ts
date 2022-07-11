import { Response, Request } from "express";
import { AccountService } from "../services/account.service";

class AccountController {
  public async getAccount(req: Request, res: Response) {
    const username = req.query.username as string;
    const password = req.query.password as string;
    const accountServiceInstance = new AccountService();
    return res.send({
      token: await accountServiceInstance.getAccountToken({
        username,
        password,
      }),
    });
  }
}

export const AccountControllerInstance = new AccountController();
