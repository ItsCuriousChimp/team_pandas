import { PrismaClient } from "@prisma/client";
import { Movie } from "../models/movie.model";
import logger from "../common/logger/logger";
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
    } catch (err) {
      logger.error({
        message: "cannot validate city",
        error: err,
        __filename,
      });
      throw err;
    }
  };

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
      logger.info({
        message: "Successfully searched for theatre and show time",
      });
      return movies;
    } catch (err) {
      logger.error({
        message: `Error in movie repository`,
        error: err,
        __filename,
      });
      throw err;
    }
  };
}

export const movieRepository = new MovieRepository();
