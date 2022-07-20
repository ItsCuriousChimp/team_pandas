import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import {Account} from "../models/account.model";
import logger  from "../common/logger/logger";


class AccountRepository{

  prisma:PrismaClient;
  constructor(){
    this.prisma = new PrismaClient;
  }
  
isValidToken = async (query: string): Promise<boolean> => {
    const account = await this.prisma.account.findMany({
      where: {
        token: query,
      },
    });
    if (account.length > 0) {
      return bcrypt.compare(query, account[0].token);
    }
    return false;
  };


  getUserId = async (query: string): Promise<string> => {
    const account = await this.prisma.account.findMany({
      where: {
        token: query,
      },
    });
    return account[0].userId;
  };


  updateToken = async (id: string): Promise<void> => {
    await this.prisma.account.update({
      where: {
        id: id,
      },
      data: {
        token: "",
      },
    });
  }

  removeToken = async (query: string): Promise<boolean> => {
  try{
    if(await this.isValidToken(query)){
      const userId: string = await this.getUserId(query);
      await this.updateToken(userId);
      logger.info("Logged out sucessfully !");
      return true;
    }
  }catch(err){
    logger.error("Unable to logout", err);
    return false;
  }
  return false;
  };
}

export const accountRepository = new AccountRepository(); 