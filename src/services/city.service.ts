import { CityRepository } from "../repositories/city.repository";

import { City } from "../models/city.model";
export class CityService {
  async getAllCities(): Promise<City[]> {
    const cityRepository = new CityRepository();
    const cities: City[] = await cityRepository.getAllCities();
    return cities;
  }
}
