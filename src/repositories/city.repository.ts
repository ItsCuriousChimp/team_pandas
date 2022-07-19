import { City } from "../models/city.model";
import { PrismaClient } from "@prisma/client";

export class CityRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async getAllCities(): Promise<City[]> {
    const cities: City[] = await this.prisma.city.findMany();
    return cities;
  }
}
export const cityRepository = new CityRepository();
