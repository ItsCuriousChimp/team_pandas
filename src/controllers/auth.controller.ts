import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";
import logger from "../common/logger/logger";

class AuthController {
  public async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("register user", {
        ...req.body,
        __filename,
        functionName: "registerUser",
      });
      const token: string | null = await authService.registerUser({
        ...req.body,
      });
      logger.info("user sucessfully registered", {
        status: 200,
        __filename,
        functionName: "registerUser",
      });
      res.send({ token: token });
    } catch (error) {
      next(error);
    }
  }
}
export const authController = new AuthController();
