import { PrismaClient } from "@prisma/client";
import { loginDto } from "../data/dtos/login.dto";
import logger from "../common/logger/logger";
import { Account } from "../models/account.model";
import DatabaseError from "../common/utils/customErrors/databaseError";
import prismaClient from "./prisma";

class AccountRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = prismaClient;
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
      throw new DatabaseError("Cannot fetch user", err, query);
    }
  };
}

export const accountRepository = new AccountRepository();
