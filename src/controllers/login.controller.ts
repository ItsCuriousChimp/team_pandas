import { Response, Request } from "express";
import logger from "../common/logger/logger";
import { loginService } from "../services/login.service";

class LoginController {
  public getToken = async (req: Request, res: Response) => {
    try {
      const token: object = await loginService.getToken(req.body);
      res.send(token);
    } catch (err: unknown) {
      logger.error({
        level: "error",
        message: "Cannot send token",
      });
      res.send(err);
    }
  };
}

export const loginController = new LoginController();
