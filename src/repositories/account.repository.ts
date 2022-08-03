/* eslint-disable no-useless-catch */
import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";
import { Account } from "../models/account.model";

export class AccountRepository {
  username: string;
  prisma: PrismaClient;
  constructor(username: string) {
    this.username = username;
    this.prisma = new PrismaClient();
  }
  getAccount = async (): Promise<string | null> => {
    try {
      logger.info("get account", {
        username: this.username,
        __filename,
        functionName: "getAccount",
      });
      const accountIdJson = await this.prisma.account.findFirst({
        where: {
          username: this.username,
        },
        select: {
          id: true,
        },
      });
      const accountId: string = accountIdJson?.id as string;
      logger.info("get account from DB successful", {
        accountId,
        __filename,
        functionName: "getAccount",
      });
      return accountId;
    } catch (err) {
      console.log("error in fetching account");
      // throw new CustomError({
      //   ...err,
      //   data: this.username,
      //   statusCode: 500,
      //   message: "Unable to fetch account",
      // });
      throw err;
    }
  };
  createAccount = async (password: string): Promise<string> => {
    try {
      logger.info("create account", {
        username: this.username,
        __filename,
        functionName: "CreateAccount",
      });
      const account = await this.prisma.account.create({
        data: {
          username: this.username,
          passwordHash: password,
        },
      });
      const accountId: string = account?.id as string;
      logger.info("account creation successful", {
        accountId,
        __filename,
        functionName: "CreateAccount",
      });
      return accountId;
    } catch (err) {
      // throw new CustomError({
      //   ...err,
      //   data: this.username,
      //   statusCode: 500,
      //   message: "unable to create account",
      // });
      throw err;
    }
  };

  updateAccountWithUserId = async (
    accountId: string,
    userId: string
  ): Promise<Account> => {
    try {
      logger.info("update account table with user Id", {
        accountId,
        userId,
        __filename,
        functionName: "updateAccountWithUserId",
      });
      const updateAccount: Account = await this.prisma.account.update({
        where: {
          id: accountId,
        },
        data: {
          userId,
        },
      });
      logger.info("updation successful", {
        accountId,
        __filename,
        functionName: "updateAccountWithUserId",
      });
      return updateAccount;
    } catch (err) {
      console.log("error in updating account with userId");
      // throw new CustomError({
      //   ...err,
      //   data: userId,
      //   statusCode: 500,
      //   message: "Unable to update account with userId",
      // });
      throw err;
    }
  };
}
