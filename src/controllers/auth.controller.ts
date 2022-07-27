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
}
export const authController = new AuthController();
