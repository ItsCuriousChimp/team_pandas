import { cityService } from "../services/city.service";

import { Request, Response } from "express";

class CityController {
  getAllCities = async (req: Request, res: Response) => {
    const cities = await cityService.getAllCities();
    res.send(cities);
  };
}
export const cityController = new CityController();
