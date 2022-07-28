import { Request, Response, NextFunction } from "express";
import logger from "../common/logger/logger";
import { authService } from "../services/auth.service";

class AuthController {
  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("logout", { __filename, functionName: "logout" });
      const token = req.headers.authorization as string;
      const [, tokenBody] = token.split(" ");
      const loggedOut: boolean = await authService.logout(tokenBody);
      if (!loggedOut) {
        throw new Error("log out failed");
      }
      logger.info("logout successful", { __filename, functionName: "logout" });

      res.status(200).send("Successfully logged out");
    } catch (error) {
      next(error);
    }
  }
}
export const authController = new AuthController();
