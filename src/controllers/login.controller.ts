import { Response, Request } from "express";
import { loginService } from "../services/login.service";

class LoginController {
  public async getToken(req: Request, res: Response) {
    const token: object = await loginService.getAccountToken(req.body);
    res.send(token);
  }
}

export const loginController = new LoginController();
