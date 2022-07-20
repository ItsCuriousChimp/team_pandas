import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { loginDto } from "../common/customTypes/login.type";
import * as bcrypt from "bcryptjs";

class AccountRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  createToken = (params: object): string => {
    const privateKey = process.env.PRIVATE_KEY as string;
    const token = jwt.sign(params, privateKey, { expiresIn: "30d" });
    return token;
  };

  isValidAccount = async (query: loginDto): Promise<boolean> => {
    const account = await this.prisma.account.findMany({
      where: {
        username: query.username,
      },
    });
    if (account.length > 0) {
      return bcrypt.compare(query.password, account[0].passwordHash);
    }
    return false;
  };

  getUserId = async (query: loginDto): Promise<string> => {
    const account = await this.prisma.account.findMany({
      where: {
        username: query.username,
      },
    });
    return account[0].userId;
  };

  updateLastLogin = async (id: string): Promise<void> => {
    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        loggedInAtUTC: new Date(),
      },
    });
  };

  getToken = async (query: loginDto): Promise<string | null> => {
    if (await this.isValidAccount(query)) {
      const userId: string = await this.getUserId(query);
      await this.updateLastLogin(userId);

      return this.createToken(query);
    } else return null;
  };
}

export const accountRepository = new AccountRepository();
