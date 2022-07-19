import { Booking } from "../models/booking.model";
import { PrismaClient } from "@prisma/client";
import logger from "../common/loggers/logger";

class BookingRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getBookingDetails = async (userId: string): Promise<Booking[]> => {
    try {
      const bookingDetails = await this.prisma.booking.findMany({
        where: {
          userId: userId,
        },
      });
      return bookingDetails;
    } catch (err) {
      logger.error("Oops!!! looks like you got an error", err);
      throw err;
    }
  };
}

export const bookingRepository = new BookingRepository();
