import { userRepository } from "../repositories/user.repository";

class UserService {
  isUserValid = async (userId: string): Promise<boolean> => {
    return (await userRepository.getUser(userId)) ? true : false;
  };
}

export const userService = new UserService();
