import { User } from "../models/user.model";
import { PrismaClient } from "@prisma/client";
import { signupDto } from "../common/customTypes/signup.type";

class UserRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(query: signupDto): Promise<string> {
    const user = await this.prisma.user.create({
      data: {
        name: query.name,
        email: query.email,
        loggedInAtUTC: new Date(),
      },
    });
    return user.id;
  }
}
export const userRepository = new UserRepository();
