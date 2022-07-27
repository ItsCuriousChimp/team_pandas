import { PrismaClient } from "@prisma/client";
import { loginDto } from "../common/customTypes/login.type";
import logger from "../common/logger/logger";

class AuthRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getUserAccount = async (
    query: loginDto
  ): Promise<{ username: string; passwordHash: string; userId: string }[]> => {
    try {
      const accounts = await this.prisma.account.findMany({
        where: {
          username: query.username,
        },
        select: {
          username: true,
          passwordHash: true,
          userId: true,
        },
      });
      return accounts;
    } catch (err) {
      logger.error({
        level: "error",
        message: `Error in validating user's account ${err}`,
      });
      throw err;
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
    } catch (err) {
      logger.error({
        message: `Error at updating user's last login ${err}`,
      });
      throw err;
    }
  };
}

export const authRepository = new AuthRepository();
