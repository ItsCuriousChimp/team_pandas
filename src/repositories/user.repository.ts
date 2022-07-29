import { User } from "../models/user.model";
import { PrismaClient } from "@prisma/client";
import { updateUserDto } from "../common/customTypes/user.type";
import logger from "../common/logger/logger";

class UserRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  updateUser = async (query: updateUserDto): Promise<User> => {
    try {
      logger.info("update user details", {
        query,
        __filename,
        functionName: "updateUser",
      });
      const updateUser: User = await this.prisma.user.update({
        where: {
          id: query.userId,
        },
        data: {
          name: query.name,
          email: query.email,
          phoneNumber: query.phoneNumber,
          cityId: query.cityId,
        },
      });
      logger.info("updated user details successfully", {
        id: query.userId,
        __filename,
        functionName: "updateUser",
      });

      return updateUser;
    } catch (err) {
      console.log("could not update user details in Db");
      throw err;
    }
  };
}
export const userRepository = new UserRepository();
