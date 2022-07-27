import { PrismaClient } from "@prisma/client";
import { loginDto } from "../data/dtos/login.dto";
import logger from "../common/logger/logger";
import { Account } from "../models/account.model";

class AccountRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getUserAccount = async (query: loginDto): Promise<Account | null> => {
    try {
      return await this.prisma.account.findUnique({
        where: {
          username: query.username,
        },
      });
    } catch (err) {
      logger.error({
        data: query,
        error: err,
        __filename,
        message: `Exception while fetching user account details`,
      });
      throw err;
    }
  };
}

export const accountRepository = new AccountRepository();
