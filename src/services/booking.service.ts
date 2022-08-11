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
    return await bookingRepository.addBooking(
      userId,
      showId,
      numberOfSeatsBooked,
      showDate
    );
  };
}

export const bookingService = new BookingService();
