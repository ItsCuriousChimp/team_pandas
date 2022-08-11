import { dataDTO } from "../common/customTypes/insertData.type";
import { bookedSeatRepository } from "../repositories/bookedSeat.repository";
import { bookingService } from "./booking.service";

class BookedSeatService {
  addSeat = async (bookingId: string, insertData: dataDTO[]): Promise<void> => {
    if (await bookingService.isBookingValid(bookingId))
      await bookedSeatRepository.addSeat(insertData);
    else throw new Error("Invalid Booking Id");
  };
}

export const bookedSeatService = new BookedSeatService();
