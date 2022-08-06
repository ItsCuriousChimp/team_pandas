import { PrismaClient } from "@prisma/client";
import { Theatre } from "../models/theatre.model";
import logger from "../common/logger/logger";
import { Movie } from "../models/movie.model";
import { City } from "../models/city.model";

class TheatreRespository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  getMovie = async (movieId: string): Promise<Movie | null> => {
    try {
      const movie: Movie | null = await this.prisma.movie.findUnique({
        where: {
          id: movieId,
        },
      });
      return movie;
    } catch (err) {
      logger.error({
        error: err,
        __filename,
        message: "Unable to find movie",
      });
      throw err;
    }
  };
  getCity = async (cityId: string): Promise<City | null> => {
    try {
      const city: City | null = await this.prisma.city.findUnique({
        where: {
          id: cityId,
        },
      });
      return city;
    } catch (err) {
      logger.error({
        error: err,
        __filename,
        message: "Unable to find city",
      });
      throw err;
    }
  };
  getTheatreAndShowTimeWithMovie = async (
    movieId: string,
    cityId: string
  ): Promise<Theatre[]> => {
    try {
      const theatresWithShowTime: Theatre[] = await this.prisma
        .$queryRawUnsafe(`select distinct th.name,sh."showStartTimeInUtc" from "Show" as sh
			inner join "Screen" as sc 
			on sh."screenId" = sc.id 
			inner join "Theatre" as th
			on sc."theatreId" = th.id
			where sh."movieId" = '${movieId}' and th."cityId" = '${cityId}'`);

      logger.info({
        message: `Successfully searched for theatres`,
      });
      return theatresWithShowTime;
    } catch (error) {
      logger.error({
        error: error,
        __filename,
        message: `Unable to find theatre and showtime of the movie`,
      });
      throw error;
    }
  };
}

export const theatreRespository = new TheatreRespository();
