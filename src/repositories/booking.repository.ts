/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { dbClient } from "./dbClient";
import logger from "../common/logger/logger";
import { Booking } from "../models/booking.model";
import CustomError from "../common/utils/customErrors/customError";

class BookingRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = dbClient.prisma;
  }

  getBooking = async (bookingId: string): Promise<Booking | null> => {
    try {
      const booking: Booking | null = await this.prisma.booking.findUnique({
        where: {
          id: bookingId,
        },
      });
      return booking;
    } catch (err: any) {
      logger.error({
        error: err,
        __filename,
        message: "Unable to find user's bookings",
      });
      throw new CustomError({
        ...err,
        data: bookingId,
        statusCode: 500,
        message: "Unable to find user's bookings",
      });
    }
  };

  addBooking = async (
    userId: string,
    showId: string,
    numberOfSeatsBooked: number,
    showDate: Date
  ): Promise<string> => {
    try {
      const booking: Booking = await this.prisma.booking.create({
        data: {
          userId: userId,
          showId: showId,
          numberOfSeatsBooked: numberOfSeatsBooked,
          showDate: showDate,
        },
      });
      return booking.id;
    } catch (err: any) {
      logger.error({
        error: err,
        __filename,
        message: `Booking failed!!!`,
      });
      throw new CustomError({
        ...err,
        data: { userId, showId, numberOfSeatsBooked, showDate },
        statusCode: 500,
        message: "Booking failed",
      });
    }
  };
}

export const bookingRepository = new BookingRepository();
