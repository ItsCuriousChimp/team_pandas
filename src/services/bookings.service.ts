import { Booking } from "../models/booking.model";
import { bookingRepository } from "../repositories/bookings.repository";

class BookingService {
  getBookingDetails = async (userId: string): Promise<Booking[]> => {
    const bookingDetails = await bookingRepository.getBookingDetails(userId);
    return bookingDetails;
  };
}

export const bookingService = new BookingService();
