import { User } from "../models/user.model";
import { PrismaClient } from "@prisma/client";
import { signupDto } from "../common/customTypes/signup.type";
import logger from "../common/logger/logger";

class UserRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(query: signupDto): Promise<string> {
    try {
      logger.info("create user in user table", {
        query,
        __filename,
        functionName: "createUser",
      });
      const user = await this.prisma.user.create({
        data: {
          name: query.name,
          email: query.email,
          phoneNumber: query.phonenumber,
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
      console.log("error in creating user");
      throw err;
    }
  }
}
export const userRepository = new UserRepository();
