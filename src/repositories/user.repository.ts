import { User } from "../models/user.model";
import { PrismaClient } from "@prisma/client";
import { updateUserDto } from "../data/dtos/user.dto";
import logger from "../common/logger/logger";

class UserRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  getUserId = async (userId: string): Promise<string | null> => {
    try {
      logger.info("get UserId", {
        userId,
        __filename,
        functionName: "getUserId",
      });

      const userIdJson = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
        },
      });
      const id: string = userIdJson?.id as string;
      logger.info("fetching user successful", {
        id,
        __filename,
        functionName: "getUserId",
      });

      return id;
    } catch (err) {
      console.log("unable to fetch user Id");
      // throw new CustomError({
      //   ...err,
      //   data: userId,
      //   statusCode: 500,
      //   message: "Unable to fetch user",
      // });
      throw err;
    }
  };

  updateUser = async (params: updateUserDto): Promise<User> => {
    try {
      logger.info("update user details", {
        query: params,
        __filename,
        functionName: "updateUser",
      });
      const updateUser: User = await this.prisma.user.update({
        where: {
          id: params.userId,
        },
        data: {
          name: params.name,
          email: params.email,
          phoneNumber: params.phoneNumber,
          cityId: params.cityId,
        },
      });
      logger.info("updated user details successfully", {
        id: params.userId,
        __filename,
        functionName: "updateUser",
      });

      return updateUser;
    } catch (err) {
      console.log("could not update user details in Db");
      // throw new CustomError({
      //   ...err,
      //   data: userId,
      //   statusCode: 500,
      //   message: "Unable to update User details",
      // });
      throw err;
    }
  };
}
export const userRepository = new UserRepository();
