/* eslint-disable no-useless-catch */

import { cityRepository } from "../repositories/city.repository";

import { City } from "../models/city.model";
import logger from "../common/logger/logger";
export class CityService {
  getAllCities = async (): Promise<City[]> => {
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
      throw err;
    }
  };
}
export const cityService = new CityService();
