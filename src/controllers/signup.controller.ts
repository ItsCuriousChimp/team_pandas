import { Request, Response } from "express";
import { signupService } from "../services/signup.service";
import { signupDto } from "../common/customTypes/signup.type";

class SignupController {
  public async registerUser(req: Request, res: Response) {
    const signupDto = { ...req.body };
    const token: string | null = await signupService.createUser(signupDto);
    console.log(signupDto);
    res.send({ token: token });
  }
}
export const signupController = new SignupController();
