/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { dbClient } from "./dbClient";
import logger from "../common/logger/logger";
import { User } from "../models/user.model";
import DatabaseError from "../common/utils/customErrors/databaseError";
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
        message: "Unable to fetch user details",
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

  updateLastLogin = async (userId: string): Promise<void> => {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          loggedInAtUTC: new Date(),
        },
      });
      logger.info({
        message: "Successfully updated user's last login",
        data: userId,
      });
    } catch (err: any) {
      logger.error({
        error: err,
        __filename,
        message: `Unable to update user's last login`,
      });
      throw new DatabaseError(
        "Unable to update user's last login",
        err,
        userId
      );
    }
  };
}

export const userRepository = new UserRepository();
