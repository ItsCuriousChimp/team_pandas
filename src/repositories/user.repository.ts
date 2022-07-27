import { User } from "../models/user.model";
import { PrismaClient } from "@prisma/client";
//need to resolve this
import { signupDto } from "../common/customTypes/signup.type";
import { updateUserDto } from "../common/customTypes/updateUser.type";

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
  async updateUser(query: updateUserDto): Promise<User> {
    const updateUser: User = await this.prisma.user.update({
      where: {
        id: query.id,
      },
      data: {
        // hopefully this works ;)
        ...query,
      },
    });
    return updateUser;
  }
}
export const userRepository = new UserRepository();
