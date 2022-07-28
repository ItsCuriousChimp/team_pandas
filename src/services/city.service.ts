import { cityRepository } from "../repositories/city.repository";

import { City } from "../models/city.model";
import logger from "../common/logger/logger";
export class CityService {
  async getAllCities(): Promise<City[]> {
    try {
      logger.info("get all cities", {
        __filename,
        functionName: "getAllCities",
      });
      const cities: City[] = await cityRepository.getAllCities();
      logger.info("list of cities retrieved successfully", {
        __filename,
        functionName: "getAllCities",
      });
      return cities;
    } catch (err) {
      console.log("could not fetch cities");
      throw err;
    }
  }
}
export const cityService = new CityService();
