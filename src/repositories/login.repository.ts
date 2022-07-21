import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { loginDto } from "../common/customTypes/login.type";
import * as bcrypt from "bcryptjs";
import logger from "../common/logger/logger";

class AccountRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  createToken = (params: object): string => {
    try {
      const privateKey = process.env.PRIVATE_KEY as string;
      const token = jwt.sign(params, privateKey, { expiresIn: "30d" });
      logger.info({
        level: "info",
        message: "access token created",
      });
      return token;
    } catch (err) {
      logger.info({
        level: "2",
        message: `Error in generating token ${err}`,
      });
      throw err;
    }
  };

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
      logger.info({
        level: "2",
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
      logger.info({
        level: "3",
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
      logger.info({
        level: "4",
        message: `Error at updating user's last login ${err}`,
      });
      throw err;
    }
  };

  getToken = async (query: loginDto): Promise<object> => {
    try {
      if (await this.isValidAccount(query)) {
        const userId: string = await this.getUserId(query);
        await this.updateLastLogin(userId);

        return { token: this.createToken(query) };
      } else return { message: "Invalid Credentials" };
    } catch (err) {
      logger.info({
        level: "1",
        message: `Error at getToken ${err}`,
      });
      throw err;
    }
  };
}

export const accountRepository = new AccountRepository();
