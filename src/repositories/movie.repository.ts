/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { dbClient } from "./dbClient";
import logger from "../common/logger/logger";
import CustomError from "../common/utils/customErrors/customError";
import { City } from "../models/city.model";
import { Movie } from "../models/movie.model";

class MovieRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = dbClient.prisma;
  }

  getCity = async (cityId: string): Promise<City | null> => {
    try {
      dbClient.dbConnect();

      const city: City | null = await this.prisma.city.findUnique({
        where: { id: cityId },
      });

      return city;
    } catch (err: any) {
      logger.error({
        message: "Unable to fetch city",
        error: err,
        __filename,
      });
      throw new CustomError({
        data: cityId,
        ...err,
        message: "Unable to fetch city",
        statusCode: 500,
      });
    }
  };

  getAllMoviesInCity = async (cityId: string): Promise<Movie[]> => {
    try {
      dbClient.dbConnect();

      const movies: Movie[] = await this.prisma.$queryRawUnsafe(
        `select distinct mv.* from "Theatre" as th
				inner join "Screen" as sc 
				on sc."theatreId" = th.id
				inner join "Show" as sh on
				sh."screenId" = sc.id
				inner join "Movie" as mv on
				mv.id = sh."movieId" where th."cityId" = '${cityId}'`
      );
      logger.info({
        message: "Successfully searched for theatre and show time",
      });
      return movies;
    } catch (err: any) {
      logger.error({
        message: `Unable to fetch moviesin the city`,
        error: err,
        __filename,
      });
      throw new CustomError({
        data: cityId,
        ...err,
        message: "Unable to fetch movies in the city",
        statusCode: 500,
      });
    }
  };
}

export const movieRepository = new MovieRepository();
