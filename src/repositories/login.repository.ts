import { PrismaClient } from "@prisma/client";
import { loginDto } from "../common/customTypes/login.type";
import * as bcrypt from "bcryptjs";
import logger from "../common/logger/logger";

class LoginRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  isValidAccount = async (query: loginDto): Promise<boolean> => {
    try {
      const account = await this.prisma.account.findMany({
        where: {
          username: query.username,
        },
      });
      if (account.length > 0) {
        return bcrypt.compare(query.password, account[0].passwordHash);
      }
      return false;
    } catch (err) {
      logger.error({
        level: "error",
        message: `Error in validating user's account ${err}`,
      });
      throw err;
    }
  };

  getUserId = async (query: loginDto): Promise<string> => {
    try {
      const account = await this.prisma.account.findMany({
        where: {
          username: query.username,
        },
      });
      return account[0].userId;
    } catch (err) {
      logger.error({
        level: "error",
        message: `Error in fetching user's ID ${err}`,
      });
      throw err;
    }
  };

  updateLastLogin = async (id: string): Promise<void> => {
    try {
      await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          loggedInAtUTC: new Date(),
        },
      });
    } catch (err) {
      logger.error({
        level: "error",
        message: `Error at updating user's last login ${err}`,
      });
      throw err;
    }
  };
}

export const loginRepository = new LoginRepository();
