import { Booking } from "../models/booking.model";
import { bookingRepository } from "../repositories/booking.repository";

class BookingService {
  getBookingDetails = async (userId: string): Promise<Booking[] | object> => {
    const bookingDetails = await bookingRepository.getBookingDetails(userId);
    return bookingDetails;
  };
}

export const bookingService = new BookingService();
