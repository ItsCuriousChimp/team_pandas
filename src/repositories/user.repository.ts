/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { dbClient } from "./dbClient";
import logger from "../common/logger/logger";
import { User } from "../models/user.model";
import CustomError from "../common/utils/customErrors/customError";

class UserRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = dbClient.prisma;
  }

  getUser = async (userId: string): Promise<User | null> => {
    try {
      const user: User | null = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (err: any) {
      logger.error({
        message: "Unable to fetch user",
        error: err,
        __filename,
      });
      throw new CustomError({
        ...err,
        data: userId,
        statusCode: 500,
        message: "Unable to fetch user",
      });
    }
  };
}

export const userRepository = new UserRepository();
