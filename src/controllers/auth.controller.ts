import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";
import { signupDto } from "../common/customTypes/signup.type";

class AuthController {
  public async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const signupDto = { ...req.body };
      const token: string | null = await authService.createUser(signupDto);
      //information logging
      // console.log(signupDto);
      res.send({ token: token });
    } catch (error) {
      next(error);
    }
  }

  public async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization as string;
      const [, tokenBody] = token.split(" ");
      const LoggedOut: boolean = await authService.logoutUser(tokenBody);
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
