import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";

class CityRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  getCityId = async (cityId: string): Promise<string | null> => {
    try {
      logger.info("get CityId", {
        cityId,
        __filename,
        functionName: "getCityId",
      });

      const cityIdJson = await this.prisma.city.findUnique({
        where: {
          id: cityId,
        },
        select: {
          id: true,
        },
      });
      const id: string = cityIdJson?.id as string;
      logger.info("fetching city successful", {
        id,
        __filename,
        functionName: "getCityId",
      });

      return id;
    } catch (err) {
      console.log("unable to fetch city Id");
      // throw new CustomError({
      //   ...err,
      //   data: cityId,
      //   statusCode: 500,
      //   message: "Unable to fetch city",
      // });
      throw err;
    }
  };
}
export const cityRepository = new CityRepository();
