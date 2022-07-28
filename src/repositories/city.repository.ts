import { City } from "../models/city.model";
import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";

export class CityRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  getAllCities = async (): Promise<City[]> => {
    try {
      logger.info("get all cities", {
        __filename,
        functionName: "getAllCities",
      });
      const cities: City[] = await this.prisma.city.findMany();
      logger.info("cities list fetched from db", {
        __filename,
        functionName: "getAllCities",
      });
      return cities;
    } catch (err) {
      console.log("could not fetch cities from DB");
      throw err;
    }
  };
}
export const cityRepository = new CityRepository();
