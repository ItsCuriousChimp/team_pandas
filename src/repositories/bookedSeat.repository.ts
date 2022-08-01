/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma, PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";
import CustomError from "../common/utils/customErrors/customError";
import { dbClient } from "./dbClient";

class BookedSeatRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = dbClient.prisma;
  }

  addSeat = async (
    insertData: {
      bookingId: string;
      showId: string;
      seatId: string;
    }[]
  ): Promise<void> => {
    try {
      const bookedSeat: Prisma.BatchPayload =
        await this.prisma.bookedSeat.createMany({
          data: insertData,
        });
    } catch (err: any) {
      logger.error({
        error: err,
        __filename,
        message: `Unable to update booked seat!!!`,
      });
      throw new CustomError({
        ...err,
        data: insertData,
        statusCode: 500,
        message: "Unable to update booked seat",
      });
    }
  };
}

export const bookedSeatRepository = new BookedSeatRepository();
