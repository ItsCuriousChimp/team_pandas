import { Request, Response, NextFunction } from "express";
import { updateUserService } from "../services/updateUser.service";
import { updateUserDto } from "../common/customTypes/updateUser.type";
import { User } from "../models/user.model";

class UpdateUserController {
  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const updateUserDto = { ...req.body };
      const user: User = await updateUserService.updateUser(updateUserDto);
      res.send(user);
    } catch (error) {
      next(error);
    }
  }
}
export const updateUserController = new UpdateUserController();
