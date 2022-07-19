import { PrismaClient } from "@prisma/client";
import { Theatre } from "../models/theatre.model";
import logger from "../common/logger/logger";

class TheatreWithMovieRespository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
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
      return theatresWithShowTime;
    } catch (error) {
      logger.info("Oops!!! looks like an error", error);
      throw error;
    }
  };
}

export const theatreWithMovieRespository = new TheatreWithMovieRespository();
