import CustomError from "../common/utils/customErrors/customError";
import { Booking } from "../models/booking.model";
import { bookingRepository } from "../repositories/booking.repository";

class BookingService {
  isUserValid = async (userId: string): Promise<boolean> => {
    return (await bookingRepository.getUser(userId)) ? true : false;
  };

  getBookingDetails = async (userId: string): Promise<Booking[]> => {
    if (!(await this.isUserValid(userId)))
      throw new CustomError({
        data: userId,
        undefined,
        message: "Invalid userId",
        statusCode: 500,
      });

    const bookingDetails = await bookingRepository.getBookingDetails(userId);

    return bookingDetails;
  };
}

export const bookingService = new BookingService();
