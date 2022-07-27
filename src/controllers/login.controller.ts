import { Response, Request, NextFunction } from "express";
import logger from "../common/logger/logger";
import { authService } from "../services/login.service";

class AuthController {
  public getToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token: string = await authService.login(req.body);
      res.status(201).json({ accessToken: token });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error({
        message: "Cannot send token",
        status: err.statusCode,
        error: err.message,
        __filename,
      });
      next(err);
    }
  };
}

export const authController = new AuthController();
