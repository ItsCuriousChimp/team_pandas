import { City } from "../models/city.model";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class CityRepository {
  async getAllCities(): Promise<City[]> {
    const cities: City[] = await prisma.city.findMany();
    return cities;
  }
}
