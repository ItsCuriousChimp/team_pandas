import logger from "../common/logger/logger";
import CustomError from "../common/utils/customErrors/customError";
import { Booking } from "../models/booking.model";
import { bookingRepository } from "../repositories/booking.repository";

class BookingService {
  isUserValid = async (userId: string): Promise<boolean> => {
    return (await bookingRepository.getUser(userId)) ? true : false;
  };

  getBookingDetails = async (userId: string): Promise<Booking[]> => {
    try {
      if (!(await this.isUserValid(userId)))
        throw new CustomError({
          data: userId,
          undefined,
          message: "Invalid userId",
          statusCode: 500,
        });

      const bookingDetails = await bookingRepository.getBookingDetails(userId);

      return bookingDetails;
    } catch (err) {
      logger.error({
        error: err,
        __filename,
        message: "Unable to fetch user's booking",
      });

      throw err;
    }
  };
}

export const bookingService = new BookingService();
