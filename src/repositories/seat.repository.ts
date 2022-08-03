/* eslint-disable @typescript-eslint/no-explicit-any */
import { Seat } from "../models/seat.model";
import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";
import { dbClient } from "./dbClient";
import CustomError from "../common/utils/customErrors/customError";

class SeatRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = dbClient.prisma;
  }
  getAvailableSeatsOfShow = async (showId: string): Promise<Seat[]> => {
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
    } catch (err: any) {
      throw new CustomError({
        ...err,
        data: showId,
        statusCode: 500,
        message: "Unable to fetch available seats of a show",
      });
    }
  };
}
export const seatRepository = new SeatRepository();
