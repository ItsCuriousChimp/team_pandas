import { Seat } from "../models/seat.model";
import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";

class ShowRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async getAvailableSeatsOfShow(showId: string): Promise<Seat[]> {
    try {
      logger.info("get screen id of show", {
        showId,
        __filename,
        functionName: "getAvailableSeatsOfShow",
      });

      const screenIdJson = await this.prisma.show.findFirst({
        where: {
          id: showId,
        },
        select: {
          screenId: true,
        },
      });
      const screenId: string = screenIdJson?.screenId as string;

      logger.info("get available seats of show", {
        screenId,
        __filename,
        functionName: "getAvailableSeatsOfShow",
      });

      const availableSeats: Seat[] = await this.prisma.$queryRawUnsafe(
        `
        SELECT s.*
        FROM ( SELECT * FROM "Seat" where "Seat"."screenId"='${screenId}' ) as s
        left join "BookedSeat" b 
          ON b."seatId" = s.id AND b."showId" = '${showId}'
         WHERE b.id IS NULL
        `
      );

      logger.info("fetching seats successful", {
        __filename,
        functionName: "getAvailableSeatsOfShow",
      });

      return availableSeats;
    } catch (err) {
      console.log("unable to fetch seats from DB");
      throw err;
    }
  }
}
export const showRepository = new ShowRepository();
