import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";
import { signupDto } from "../common/customTypes/signup.type";
import logger from "../common/logger/logger";

class AuthController {
  public async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("register user", { ...req.body }, __filename, "registerUser");
      const signupDto = { ...req.body };
      const token: string | null = await authService.registerUser(signupDto);
      logger.info(
        "user sucessfully registered",
        { status: 200 },
        __filename,
        "registerUser"
      );
      res.send({ token: token });
    } catch (error) {
      next(error);
    }
  }
}
export const authController = new AuthController();
