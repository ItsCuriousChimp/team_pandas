import { Response, Request } from "express";
import { accountService } from "../services/login.service";

class AccountController {
  public async getToken(req: Request, res: Response) {
    const token: string | null = await accountService.getAccountToken(req.body);
    res.send({ token: token });
  }
}

export const accountController = new AccountController();
