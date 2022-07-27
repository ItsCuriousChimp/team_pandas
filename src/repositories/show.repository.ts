/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma, PrismaClient } from "@prisma/client";
import { Booking } from "../models/booking.model";
import logger from "../common/logger/logger";
import { User } from "../models/user.model";
import { Show } from "../models/show.model";
import { Seat } from "../models/seat.model";

class ShowRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getUser = async (userId: string): Promise<User | null> => {
    try {
      const user: User | null = await this.prisma.user.findUnique({
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

  getShow = async (showId: string): Promise<Show | null> => {
    try {
      const show: Show | null = await this.prisma.show.findUnique({
        where: {
          id: showId,
        },
      });
      return show;
    } catch (err) {
      logger.error({
        message: "cannot find show",
        error: err,
        __filename,
      });
      throw err;
    }
  };

  getBooking = async (bookingId: string): Promise<Booking | null> => {
    try {
      const booking: Booking | null = await this.prisma.booking.findUnique({
        where: {
          id: bookingId,
        },
      });
      return booking;
    } catch (err) {
      logger.error({
        error: err,
        __filename,
        message: "cannot find user's bookings",
      });
      throw err;
    }
  };

  getSeats = async (seatIds: string[]): Promise<Seat[]> => {
    try {
      const seats: Seat[] = await this.prisma.seat.findMany({
        where: {
          id: { in: seatIds },
        },
      });
      return seats;
    } catch (err) {
      logger.error({
        error: err,
        __filename,
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
        error: err,
        __filename,
        message: `Booking failed!!!`,
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
        error: err,
        __filename,
        message: `Cannot update the booked seat!!!`,
      });
      throw err;
    }
  };
}

export const showRepository = new ShowRepository();
