import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";

class AuthController {
  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization as string;
      const [, tokenBody] = token.split(" ");
      const LoggedOut: boolean = await authService.logout(tokenBody);
      if (LoggedOut) {
        res.status(200).send("Successfully logged out");
      } else {
        return res.status(500).send("Couldnot log out");
      }
    } catch (error) {
      next(error);
    }
  }
}
export const authController = new AuthController();
