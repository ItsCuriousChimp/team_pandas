import { userRepository } from "../repositories/user.repository";
import { User } from "../models/user.model";
import { updateUserDto } from "../common/customTypes/user.type";
import logger from "../common/logger/logger";

export class UserService {
  async updateUser(query: updateUserDto): Promise<User> {
    try {
      logger.info("update user details", {
        id: query.userId,
        __filename,
        functionName: "updateUser",
      });
      const user: User = await userRepository.updateUser(query);
      logger.info("updated user details successfully", {
        id: user.id,
        __filename,
        functionName: "updateUser",
      });

      return user;
    } catch (err) {
      console.log("could not update user details");
      throw err;
    }
  }
}

export const userService = new UserService();
