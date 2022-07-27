import { Booking } from "../models/booking.model";
import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";
import { User } from "../models/user.model";

class BookingRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  getUser = async (userId: string): Promise<User | null> => {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (err) {
      logger.error({
        message: "cannot find user",
        error: err,
        __filename,
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
        message: "Successfully searched for all booking details",
      });
      return bookingDetails;
    } catch (err) {
      logger.error({
        message: `Error at booking repository  ${err}`,
        error: err,
        __filename,
      });
      throw err;
    }
  };
}

export const bookingRepository = new BookingRepository();
