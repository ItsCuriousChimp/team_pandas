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
        error: err,
        __filename,
        message: `Error in validating user's account`,
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
        error: err,
        __filename,
        message: `Error at updating user's last login`,
      });
      throw err;
    }
  };
}

export const authRepository = new AuthRepository();
