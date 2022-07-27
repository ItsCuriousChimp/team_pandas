import logger from "../common/logger/logger";
import { Booking } from "../models/booking.model";
import { bookingRepository } from "../repositories/booking.repository";

class BookingService {
  isUserValid = async (userId: string): Promise<boolean> => {
    return (await bookingRepository.getUser(userId)) ? true : false;
  };

  getBookingDetails = async (userId: string): Promise<Booking[]> => {
    try {
      if (await this.isUserValid(userId)) {
        const bookingDetails = await bookingRepository.getBookingDetails(
          userId
        );
        return bookingDetails;
      }
      throw new Error("Invalid userId");
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
