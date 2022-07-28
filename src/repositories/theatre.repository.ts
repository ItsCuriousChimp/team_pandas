import { Theatre } from "../models/theatre.model";
import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";

class TheatreRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async getTheatre(theatreId: string): Promise<Theatre | null> {
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
    } catch (err) {
      console.log("unable to fetch theatre");
      throw err;
    }
  }
}
export const theatreRepository = new TheatreRepository();
