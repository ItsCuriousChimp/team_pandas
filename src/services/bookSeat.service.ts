import { showRepository } from "../repositories/show.repository";
import logger from "../common/logger/logger";
import { dataMapHelper } from "../common/helpers/dataMap.helper";
import { Seat } from "../models/seat.model";
import { dataDTO } from "../common/customTypes/insertData.type";

class BookSeatService {
  isUserValid = async (userId: string): Promise<boolean> => {
    return (await showRepository.getUser(userId)) ? true : false;
  };

  isBookingValid = async (bookingId: string): Promise<boolean> => {
    return (await showRepository.getBooking(bookingId)) ? true : false;
  };

  isSeatValid = async (seatIds: string[]): Promise<boolean> => {
    const seats: Seat[] = await showRepository.getSeats(seatIds);
    return seats.length === seatIds.length ? true : false;
  };

  isShowValid = async (showId: string): Promise<boolean> => {
    return (await showRepository.getShow(showId)) ? true : false;
  };

  addBooking = async (
    userId: string,
    showId: string,
    numberOfSeatsBooked: number,
    showDate: Date
  ): Promise<string> => {
    try {
      return await showRepository.addBooking(
        userId,
        showId,
        numberOfSeatsBooked,
        showDate
      );
    } catch (err) {
      logger.error({
        error: err,
        __filename,
        message: `Booking failed`,
      });
      throw err;
    }
  };

  addSeat = async (bookingId: string, insertData: dataDTO[]): Promise<void> => {
    try {
      if (await this.isBookingValid(bookingId))
        await showRepository.addSeat(insertData);
      else throw new Error("Invalid Booking Id");
    } catch (err) {
      logger.error({
        error: err,
        __filename,
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
  ): Promise<{ message: string }> => {
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

        const insertData: dataDTO[] = [];
        dataMapHelper.dataMap(bookingId, showId, seatIds, insertData);

        await this.addSeat(bookingId, insertData);

        return { message: "Successfully booked your seat" };
      } else {
        return { message: "Wrong parameters given" };
      }
    } catch (err) {
      logger.error({
        error: err,
        __filename,
        message: `Booking handler failed to book tickets ${err}`,
      });
      throw err;
    }
  };
}

export const bookSeatService = new BookSeatService();
