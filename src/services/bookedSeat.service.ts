import { dataDTO } from "../common/customTypes/insertData.type";
import logger from "../common/logger/logger";
import { bookedSeatRepository } from "../repositories/bookedSeat.repository";
import { bookingService } from "./booking.service";

class BookedSeatService {
  addSeat = async (bookingId: string, insertData: dataDTO[]): Promise<void> => {
    try {
      if (await bookingService.isBookingValid(bookingId))
        await bookedSeatRepository.addSeat(insertData);
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
}

export const bookedSeatService = new BookedSeatService();
