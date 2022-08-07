/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { dbClient } from "./dbClient";
import logger from "../common/logger/logger";
import { Booking } from "../models/booking.model";
import { User } from "../models/user.model";
import CustomError from "../common/utils/customErrors/customError";

class BookingRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = dbClient.prisma;
  }
  getUser = async (userId: string): Promise<User | null> => {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      return user;
    } catch (err: any) {
      logger.error({
        message: "Unable to fetch user details",
        error: err,
        __filename,
      });

      throw new CustomError({
        data: userId,
        ...err,
        message: "Unable to fetch user details",
        statusCode: 500,
      });
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
    } catch (err: any) {
      logger.error({
        message: `Unable to fetch booking details`,
        error: err,
        __filename,
      });

      throw new CustomError({
        data: userId,
        ...err,
        message: "Unable to fetch booking details",
        statusCode: 500,
      });
    }
  };
}

export const bookingRepository = new BookingRepository();
