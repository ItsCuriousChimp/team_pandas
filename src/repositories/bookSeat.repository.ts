/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma, PrismaClient } from "@prisma/client";
import { Booking } from "../models/booking.model";
import logger from "../common/logger/logger";

class BookSeatRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  isUserValid = async (userId: string): Promise<boolean> => {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      return user ? true : false;
    } catch (err) {
      logger.error({
        level: "error",
        message: "cannot find user",
      });
      throw err;
    }
  };

  isShowValid = async (showId: string): Promise<boolean> => {
    try {
      const show = await this.prisma.show.findUnique({
        where: {
          id: showId,
        },
      });
      return show ? true : false;
    } catch (err) {
      logger.error({
        level: "error",
        message: "cannot find show",
      });
      throw err;
    }
  };

  isBookingValid = async (bookingId: string): Promise<boolean> => {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: {
          id: bookingId,
        },
      });
      return booking ? true : false;
    } catch (err) {
      logger.error({
        level: "error",
        message: "cannot find user's bookings",
      });
      throw err;
    }
  };

  isSeatValid = async (seatIds: string[]): Promise<boolean> => {
    try {
      const seat = await this.prisma.seat.findMany({
        where: {
          id: { in: seatIds },
        },
      });
      console.log(seat);
      return seat.length === seatIds.length ? true : false;
    } catch (err) {
      logger.error({
        level: "error",
        message: "No such seat available",
      });
      throw err;
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
    } catch (err) {
      logger.error({
        level: "error",
        message: `Booking failed!!! ${err}`,
      });
      throw err;
    }
  };

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
    } catch (err) {
      logger.error({
        level: "error",
        message: `Cannot update the booked seat!!! ${err}`,
      });
      throw err;
    }
  };
}

export const bookSeatRepository = new BookSeatRepository();
