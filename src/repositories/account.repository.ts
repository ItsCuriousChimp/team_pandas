import { PrismaClient } from "@prisma/client";
import { loginDto } from "../data/dtos/login.dto";
import logger from "../common/logger/logger";
import { Account } from "../models/account.model";
import prismaClient from "./dbClient";
import CustomError from "../common/utils/customErrors/customError";

class AccountRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = prismaClient;
  }

  getUserAccount = async (params: loginDto): Promise<Account | null> => {
    try {
      return await this.prisma.account.findUnique({
        where: {
          username: params.username,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error({
        data: params,
        error: err,
        __filename,
        message: `Exception while fetching user account details`,
      });
      throw new CustomError({
        data: params,
        ...err,
        message: "Cannot get user",
        statusCode: 500,
      });
    }
  };
}

export const accountRepository = new AccountRepository();
