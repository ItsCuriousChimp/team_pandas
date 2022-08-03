/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { dbClient } from "./dbClient";
import logger from "../common/logger/logger";
import { signupDto } from "../data/dtos/signup.dto";
import CustomError from "../common/utils/customErrors/customError";

class UserRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = dbClient.prisma;
  }

  updateLastLogin = async (userId: string): Promise<void> => {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          loggedInAtUTC: new Date(),
        },
      });
      logger.info({
        message: "Successfully updated user's last login",
        data: userId,
      });
    } catch (err: any) {
      throw new CustomError({
        ...err,
        data: userId,
        statusCode: 500,
        message: "Unable to update user's last login",
      });
    }
  };

  async createUser(params: signupDto): Promise<string> {
    try {
      logger.info("create user in user table", {
        query: params,
        __filename,
        functionName: "createUser",
      });
      const user = await this.prisma.user.create({
        data: {
          name: params.name,
          email: params.email,
          phoneNumber: params.phoneNumber,
          cityId: params.cityId,
          loggedInAtUTC: new Date(),
        },
      });
      logger.info("creation of user in user table successful", {
        id: user.id,
        __filename,
        functionName: "createUser",
      });
      return user.id;
    } catch (err: any) {
      throw new CustomError({
        ...err,
        data: params,
        statusCode: 500,
        message: "Unable to fetch user",
      });
    }
  }
}

export const userRepository = new UserRepository();
