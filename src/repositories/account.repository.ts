/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";
import { Account } from "../models/account.model";
import { dbClient } from "./dbClient";
import CustomError from "../common/utils/customErrors/customError";

export class AccountRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = dbClient.prisma;
  }
  getAccount = async (username: string): Promise<Account | null> => {
    try {
      logger.info("get account", {
        username,
        __filename,
        functionName: "getAccount",
      });
      const account = await this.prisma.account.findUnique({
        where: {
          username: username,
        },
      });
      logger.info("get account from DB successful", {
        username,
        __filename,
        functionName: "getAccount",
      });
      return account;
    } catch (err: any) {
      console.log("error in fetching account");
      throw new CustomError({
        data: username,
        ...err,
        statusCode: 500,
        message: "Unable to fetch account",
      });
    }
  };
  createAccount = async (
    username: string,
    password: string
  ): Promise<string> => {
    try {
      logger.info("create account", {
        username,
        __filename,
        functionName: "CreateAccount",
      });
      const account = await this.prisma.account.create({
        data: {
          username: username,
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
    } catch (err: any) {
      throw new CustomError({
        ...err,
        data: username,
        statusCode: 500,
        message: "unable to create account",
      });
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
    } catch (err: any) {
      console.log("error in updating account with userId");
      throw new CustomError({
        ...err,
        data: userId,
        statusCode: 500,
        message: "Unable to update account with userId",
      });
    }
  };
}

export const accountRepository = new AccountRepository();
