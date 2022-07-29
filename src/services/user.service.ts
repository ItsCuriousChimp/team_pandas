import { userRepository } from "../repositories/user.repository";
import { cityRepository } from "../repositories/city.repository";
import { User } from "../models/user.model";
import { updateUserDto } from "../common/customTypes/user.type";
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
      console.log("unable to get user");
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
      console.log("unable to get city id");
      throw err;
    }
  };

  async updateUser(query: updateUserDto): Promise<User> {
    try {
      logger.info("update user details", {
        id: query.userId,
        __filename,
        functionName: "updateUser",
      });
      await this.isUserIdValid(query.userId);
      if (query.cityId) {
        await this.isCityIdValid(query.cityId);
      }

      const user: User = await userRepository.updateUser(query);
      logger.info("updated user details successfully", {
        id: user.id,
        __filename,
        functionName: "updateUser",
      });

      return user;
    } catch (err) {
      console.log("could not update user details");
      throw err;
    }
  }
}

export const userService = new UserService();
