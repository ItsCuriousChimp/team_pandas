/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { dbClient } from "./dbClient";
import logger from "../common/logger/logger";
import { loginDto } from "../data/dtos/login.dto";
import { Account } from "../models/account.model";
import CustomError from "../common/utils/customErrors/customError";

class AccountRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = dbClient.prisma;
  }

  getUserAccount = async (params: loginDto): Promise<Account | null> => {
    try {
      dbClient.dbConnect();
      return await this.prisma.account.findUnique({
        where: {
          username: params.username,
        },
      });
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
        message: "Unable to fetch user account details",
        statusCode: 500,
      });
    }
  };
}

export const accountRepository = new AccountRepository();
