import { PrismaClient } from "@prisma/client";
import { Account } from "../models/account.model";

export class AccountRepository {
  username: string;
  prisma: PrismaClient;
  constructor(username: string) {
    this.username = username;
    this.prisma = new PrismaClient();
  }
  async getAccount(): Promise<string | null> {
    const accountIdJson = await this.prisma.account.findFirst({
      where: {
        username: this.username,
      },
      select: {
        id: true,
      },
    });
    return accountIdJson?.id as string;
  }
  async CreateAccount(password: string): Promise<string> {
    const account = await this.prisma.account.create({
      data: {
        username: this.username,
        passwordHash: password,
      },
    });
    return account?.id as string;
  }

  async updateAccountWithUserId(
    accountId: string,
    userIdinput: string
  ): Promise<Account> {
    const updateAccount: Account = await this.prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        userId: userIdinput,
      },
    });
    return updateAccount;
  }
}
