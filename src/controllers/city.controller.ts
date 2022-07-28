import { cityService } from "../services/city.service";
import { Request, Response } from "express";
import logger from "../common/logger/logger";

class CityController {
  getAllCities = async (req: Request, res: Response) => {
    try {
      logger.info("get all cities", {
        __filename,
        functionName: "getAllCities",
      });
      const cities = await cityService.getAllCities();
      logger.info("list of cities retrieved successfully", {
        __filename,
        functionName: "getAllCities",
      });
      res.send(cities);
    } catch (err) {
      console.log("could not fetch cities");
      throw err;
    }
  };
}
export const cityController = new CityController();
