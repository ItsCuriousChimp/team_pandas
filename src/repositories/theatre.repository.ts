/* eslint-disable @typescript-eslint/no-explicit-any */
import { Theatre } from "../models/theatre.model";
import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";
import { dbClient } from "./dbClient";
import CustomError from "../common/utils/customErrors/customError";

class TheatreRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = dbClient.prisma;
  }
  getTheatre = async (theatreId: string): Promise<Theatre | null> => {
    try {
      logger.info("get theatre", {
        theatreId,
        __filename,
        functionName: "getTheatre",
      });

      const theatre = await this.prisma.theatre.findUnique({
        where: {
          id: theatreId,
        },
      });

      logger.info("fetching theatre successful", {
        __filename,
        functionName: "getTheatre",
      });

      return theatre;
    } catch (err: any) {
      console.log("unable to fetch theatre");
      throw new CustomError({
        ...err,
        data: theatreId,
        statusCode: 500,
        message: "Unable to fetch theatre",
      });
    }
  };
}
export const theatreRepository = new TheatreRepository();
