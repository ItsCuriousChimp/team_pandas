import { cityService } from "../services/city.service";
import { Request, Response, NextFunction } from "express";
import logger from "../common/logger/logger";

class CityController {
  getAllCities = async (req: Request, res: Response, next: NextFunction) => {
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
      next(err);
    }
  };
}
export const cityController = new CityController();
