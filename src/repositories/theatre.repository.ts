import { PrismaClient } from "@prisma/client";
import { Theatre } from "../models/theatre.model";
import logger from "../common/logger/logger";

class TheatreRespository {
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

      logger.log({
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
