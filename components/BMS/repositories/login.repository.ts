import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { loginDto } from "../customTypes/login.type";
import * as bcrypt from "bcryptjs";

export class AccountRepository {
  prisma: PrismaClient;

  //constructor to initialize prisma client
  constructor() {
    this.prisma = new PrismaClient();
  }

  //function to create token
  createToken(params: object): string {
    const privateKey = process.env.PRIVATE_KEY as string;
    const token = jwt.sign(params, privateKey, { expiresIn: "30d" });
    return token;
  }

  //function to validate user account
  async isValidAccount(query: loginDto): Promise<boolean> {
    const account = await this.prisma.account.findMany({
      where: {
        username: query.username,
      },
    });
    if (account.length > 0) {
      return bcrypt.compare(query.password, account[0].password);
    }
    return false;
  }

  //function to get token
  async getToken(query: loginDto): Promise<string | null> {
    if (await this.isValidAccount(query)) {
      return this.createToken(query);
    } else return null;
  }
}
