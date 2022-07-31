/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request, NextFunction } from "express";
import logger from "../common/logger/logger";
import { authService } from "../services/auth.service";

class AuthController {
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token: string = await authService.login(req.body);
      logger.info({
        message: "Successfully logged in",
      });
      res.status(200).json({ accessToken: token });
    } catch (err: any) {
      next(err);
    }
  };
}

export const authController = new AuthController();
