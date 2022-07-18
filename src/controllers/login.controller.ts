import { Response, Request } from "express";
import { AccountService } from "../services/login.service";

class AccountController {
  public async getToken(req: Request, res: Response) {
    const username = req.query.username as string;
    const password = req.query.password as string;

    const accountService = new AccountService();
    const token: string | null = await accountService.getAccountToken({
      username,
      password,
    });
    res.send({ token: token });
  }
}

export const accountController = new AccountController();
