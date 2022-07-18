import { CityService } from "../services/city.service";

import { Request, Response } from "express";

class CityController {
  getAllCities = async (req: Request, res: Response) => {
    const cityService = new CityService();
    const cities = await cityService.getAllCities();
    res.send(cities);
  };
}
const cityController = new CityController();
export default cityController;
