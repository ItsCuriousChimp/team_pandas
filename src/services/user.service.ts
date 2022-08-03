/* eslint-disable no-useless-catch */
import { userRepository } from "../repositories/user.repository";
import { cityRepository } from "../repositories/city.repository";
import { User } from "../models/user.model";
import { updateUserDto } from "../data/dtos/user.dto";
import logger from "../common/logger/logger";

export class UserService {
  isUserIdValid = async (id: string): Promise<boolean> => {
    try {
      logger.info("is UserId Valid", {
        movieId: id,
        __filename,
        functionName: "isUserIdValid",
      });
      const getUserId: string | null = await userRepository.getUserId(id);
      if ((await getUserId) == null) {
        throw new Error("User id incorrect");
      } else {
        return true;
      }
    } catch (err) {
      throw err;
    }
  };

  isCityIdValid = async (id: string): Promise<boolean> => {
    try {
      logger.info("is CityId Valid", {
        cityId: id,
        __filename,
        functionName: "isCityIdValid",
      });
      const getCityId: string | null = await cityRepository.getCityId(id);
      if ((await getCityId) == null) {
        throw new Error("City id incorrect");
      } else {
        return true;
      }
    } catch (err) {
      throw err;
    }
  };

  async updateUser(params: updateUserDto): Promise<User> {
    try {
      logger.info("update user details", {
        id: params.userId,
        __filename,
        functionName: "updateUser",
      });
      await this.isUserIdValid(params.userId);
      if (params.cityId) {
        await this.isCityIdValid(params.cityId);
      }

      const user: User = await userRepository.updateUser(params);
      logger.info("updated user details successfully", {
        id: user.id,
        __filename,
        functionName: "updateUser",
      });

      return user;
    } catch (err) {
      throw err;
    }
  }
}

export const userService = new UserService();
