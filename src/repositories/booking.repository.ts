import { Booking } from "../models/booking.model";
import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";

class BookingRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getBookingDetails = async (userId: string): Promise<Booking[] | object> => {
    try {
      const bookingDetails = await this.prisma.booking.findMany({
        where: {
          userId: userId,
        },
      });
      logger.info({
        level: "info",
        message: "Successfully searched for all booking details",
      });
      if (bookingDetails.length > 0) return bookingDetails;
      else return { message: "User not found" };
    } catch (err) {
      logger.error({
        level: "error",
        message: `Error at booking repository /n ${err}`,
      });
      throw err;
    }
  };
}

export const bookingRepository = new BookingRepository();
