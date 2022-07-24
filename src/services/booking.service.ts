import logger from "../common/logger/logger";
import { Booking } from "../models/booking.model";
import { bookingRepository } from "../repositories/booking.repository";

class BookingService {
  isUserValid = async (userId: string): Promise<boolean> => {
    return await bookingRepository.ivUserValid(userId);
  };
  getBookingDetails = async (
    userId: string
  ): Promise<Booking[] | { message: string }> => {
    try {
      if (await this.isUserValid(userId)) {
        const bookingDetails = await bookingRepository.getBookingDetails(
          userId
        );
        return bookingDetails;
      } else return { message: "Cannot find bookings for the user" };
    } catch (err) {
      logger.error({
        level: "error",
        message: "Cannot search bookings for the user",
      });
      throw err;
    }
  };
}

export const bookingService = new BookingService();
