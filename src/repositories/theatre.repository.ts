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
  isMovieValid = async (movieId: string): Promise<boolean> => {
    try {
      const movie: Movie | null = await this.prisma.movie.findUnique({
        where: {
          id: movieId,
        },
      });
      if (movie) return true;
      return false;
    } catch (err) {
      logger.error({ level: "error", message: "Cannot search for movie" });
      throw err;
    }
  };
  isCityValid = async (cityId: string): Promise<boolean> => {
    try {
      const city: City | null = await this.prisma.city.findUnique({
        where: {
          id: cityId,
        },
      });
      if (city) return true;
      return false;
    } catch (err) {
      logger.error({ level: "error", message: "Cannot search for city" });
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
        level: "info",
      });
      return theatresWithShowTime;
    } catch (error) {
      logger.error({
        level: "error",
        message: `Error found in theatreRepository - ${error}`,
      });
      throw error;
    }
  };
}

export const theatreRespository = new TheatreRespository();
