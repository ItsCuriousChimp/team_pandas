import { Booking } from "../models/booking.model";
import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";

class BookingRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  ivUserValid = async (userId: string): Promise<boolean> => {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      return user ? true : false;
    } catch (err) {
      logger.warn({
        level: "warning",
        message: "cannot find user",
      });
      throw err;
    }
  };

  getBookingDetails = async (userId: string): Promise<Booking[]> => {
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
      return bookingDetails;
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
