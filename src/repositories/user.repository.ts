import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";
import DatabaseError from "../common/utils/customErrors/databaseError";
import prismaClient from "./dbClient";

class UserRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = prismaClient;
  }

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
        message: "Successfully updated Last loggedin",
        data: userId,
      });
    } catch (err) {
      logger.error({
        error: err,
        __filename,
        message: `Error at updating user's last login`,
      });
      throw new DatabaseError("Cannot update last login", err, userId);
    }
  };
}

export const userRepository = new UserRepository();
