import { PrismaClient } from "@prisma/client";
import { Movie } from "../models/movie.model";
import logger from "../common/logger/logger";

class MoviesInCityRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getAllMoviesInCity = async (cityId: string): Promise<Movie[]> => {
    try {
      const movies: Movie[] = await this.prisma.$queryRawUnsafe(
        `select distinct mv.* from "Theatre" as th
				inner join "Screen" as sc 
				on sc."theatreId" = th.id
				inner join "Show" as sh on
				sh."screenId" = sc.id
				inner join "Movie" as mv on
				mv.id = sh."movieId" where th."cityId" = '${cityId}'`
      );

      return movies;
    } catch (err) {
      logger.error("Oops!!! looks like you have an error", err);
      throw err;
    }
  };
}

export const moviesInCityRepository = new MoviesInCityRepository();
