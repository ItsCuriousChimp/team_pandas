import { bookSeatRepository } from "../repositories/bookSeat.repository";
import logger from "../common/logger/logger";
import { dataMapHelper } from "../common/helpers/dataMap.helper";

class BookSeatService {
  isUserValid = async (userId: string): Promise<boolean> => {
    return await bookSeatRepository.isUserValid(userId);
  };

  isBookingValid = async (bookingId: string): Promise<boolean> => {
    return await bookSeatRepository.isBookingValid(bookingId);
  };

  isSeatValid = async (seatIds: string[]): Promise<boolean> => {
    return await bookSeatRepository.isSeatValid(seatIds);
  };

  isShowValid = async (showId: string): Promise<boolean> => {
    return await bookSeatRepository.isShowValid(showId);
  };

  addBooking = async (
    userId: string,
    showId: string,
    numberOfSeatsBooked: number,
    showDate: Date
  ): Promise<string> => {
    try {
      return await bookSeatRepository.addBooking(
        userId,
        showId,
        numberOfSeatsBooked,
        showDate
      );
    } catch (err) {
      logger.error({
        level: "error",
        message: `Booking failed`,
      });
      throw err;
    }
  };

  addSeat = async (
    bookingId: string,
    insertData: [
      {
        bookingId: string;
        showId: string;
        seatId: string;
      }
    ]
  ): Promise<void | { message: string }> => {
    try {
      if (await this.isBookingValid(bookingId))
        await bookSeatRepository.addSeat(insertData);
      else return { message: "Cannot update seat(s)." };
    } catch (err) {
      logger.error({
        level: "error",
        message: `Seat cannot be booked`,
      });
      throw err;
    }
  };

  bookingHandler = async (
    userId: string,
    showId: string,
    numberOfSeatsBooked: number,
    showDate: Date,
    seatIds: string[]
  ) => {
    try {
      if (
        (await this.isShowValid(showId)) &&
        (await this.isSeatValid(seatIds)) &&
        (await this.isUserValid(userId))
      ) {
        const bookingId: string = await this.addBooking(
          userId,
          showId,
          numberOfSeatsBooked,
          showDate
        );

        const insertData: [
          {
            bookingId: string;
            showId: string;
            seatId: string;
          }
        ] = [
          {
            bookingId: "",
            showId: "",
            seatId: "",
          },
        ];
        insertData.pop();
        dataMapHelper.dataMap(bookingId, showId, seatIds, insertData);

        await this.addSeat(bookingId, insertData);

        return { message: "Successfully booked your seat" };
      } else {
        return { message: "Wrong parameters given" };
      }
    } catch (err) {
      logger.error({
        level: "error",
        message: `Booking handler failed to book tickets ${err}`,
      });
      throw err;
    }
  };
}

export const bookSeatService = new BookSeatService();
