import { userRepository } from "../repositories/user.repository";
import { User } from "../models/user.model";
import { updateUserDto } from "../common/customTypes/updateUser.type";

export class UpdateUserService {
  async updateUser(query: updateUserDto): Promise<User> {
    const user: User = await userRepository.updateUser(query);
    return user;
  }
}

export const updateUserService = new UpdateUserService();
