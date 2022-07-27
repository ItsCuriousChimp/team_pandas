import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";

class UserRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
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
      });
    } catch (err) {
      logger.error({
        error: err,
        __filename,
        message: `Error at updating user's last login`,
      });
      throw err;
    }
  };
}

export const userRepository = new UserRepository();
