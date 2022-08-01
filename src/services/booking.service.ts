import logger from "../common/logger/logger";
import { bookingRepository } from "../repositories/booking.repository";

class BookingService {
  isBookingValid = async (bookingId: string): Promise<boolean> => {
    return (await bookingRepository.getBooking(bookingId)) ? true : false;
  };

  addBooking = async (
    userId: string,
    showId: string,
    numberOfSeatsBooked: number,
    showDate: Date
  ): Promise<string> => {
    try {
      return await bookingRepository.addBooking(
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
}

export const bookingService = new BookingService();
