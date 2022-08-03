/* eslint-disable no-useless-catch */
import { PrismaClient } from "@prisma/client";
import { signupDto } from "../data/dtos/signup.dto";
import logger from "../common/logger/logger";

class UserRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

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
    } catch (err) {
      // throw new CustomError({
      //   ...err,
      //   data: params,
      //   statusCode: 500,
      //   message: "Unable to fetch user",
      // });
      throw err;
    }
  }
}
export const userRepository = new UserRepository();
