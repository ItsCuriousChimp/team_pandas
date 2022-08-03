/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import { City } from "../models/city.model";
import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";
import CustomError from "../common/utils/customErrors/customError";
import { dbClient } from "./dbClient";

export class CityRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = dbClient.prisma;
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
    } catch (err: any) {
      throw new CustomError({
        ...err,
        data: null,
        statusCode: 500,
        message: "Unable to fetch cities",
      });
    }
  };
}
export const cityRepository = new CityRepository();
