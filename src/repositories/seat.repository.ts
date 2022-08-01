/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { dbClient } from "./dbClient";
import { Seat } from "../models/seat.model";
import logger from "../common/logger/logger";
import CustomError from "../common/utils/customErrors/customError";

class SeatRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = dbClient.prisma;
  }
  getSeats = async (seatIds: string[]): Promise<Seat[]> => {
    try {
      const seats: Seat[] = await this.prisma.seat.findMany({
        where: {
          id: { in: seatIds },
        },
      });
      return seats;
    } catch (err: any) {
      logger.error({
        error: err,
        __filename,
        message: "No such seat available",
      });
      throw new CustomError({
        ...err,
        data: seatIds,
        statusCode: 500,
        message: "Unable to verify seats",
      });
    }
  };
}

export const seatRepository = new SeatRepository();
