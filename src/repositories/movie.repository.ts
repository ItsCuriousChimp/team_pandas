/* eslint-disable @typescript-eslint/no-explicit-any */
import { Movie } from "../models/movie.model";
import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";
import CustomError from "../common/utils/customErrors/customError";
import { City } from "../models/city.model";

class MovieRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  getCity = async (cityId: string): Promise<City | null> => {
    try {
      const city: City | null = await this.prisma.city.findUnique({
        where: { id: cityId },
      });
      return city;
    } catch (err: any) {
      logger.error({
        data: cityId,
        message: "Unable to find city",
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

  public getMoviesByLanguage = async (
    language: string,
    cityId: string
  ): Promise<Movie[]> => {
    try {
      const movies: Movie[] = await this.prisma.$queryRawUnsafe(
        `select distinct mv.* from "Theatre" as th
				inner join "Screen" as sc 
				on sc."theatreId" = th.id
				inner join "Show" as sh on
				sh."screenId" = sc.id
				inner join "Movie" as mv on
				mv.id = sh."movieId" where th."cityId" = '${cityId}' and mv.language = '${language}'`
      );

      logger.info("Successfully filtered movies");

      return movies;
    } catch (err: any) {
      logger.error({
        data: { language, cityId },
        message: "Unable to filter movies",
        error: err,
        __filename,
      });

      throw new CustomError({
        data: { language, cityId },
        ...err,
        message: "Unable to filter movies",
        statusCode: 500,
      });
    }
  };
}
export const movieRepository = new MovieRepository();
