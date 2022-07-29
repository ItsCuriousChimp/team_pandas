import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service";
import { User } from "../models/user.model";
import logger from "../common/logger/logger";

class UserController {
  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("update user details", {
        query: req.body.userId,
        __filename,
        functionName: "updateUser",
      });
      const user: User = await userService.updateUser({ ...req.body });
      logger.info("update user details", {
        id: user.id,
        __filename,
        functionName: "updateUser",
      });

      res.send(user);
    } catch (error) {
      next(error);
    }
  }
}
export const userController = new UserController();
