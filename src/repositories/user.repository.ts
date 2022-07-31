/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { dbClient } from "./dbClient";
import logger from "../common/logger/logger";
import DatabaseError from "../common/utils/customErrors/databaseError";

class UserRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = dbClient.prisma;
  }

  updateLastLogin = async (userId: string): Promise<void> => {
    try {
      dbClient.dbConnect();
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
