import { dataMapHelper } from "../common/helpers/dataMap.helper";
import { dataDTO } from "../common/customTypes/insertData.type";
import { bookingService } from "./booking.service";
import { bookedSeatService } from "./bookedSeat.service";
import { userService } from "./user.service";
import { seatService } from "./seat.service";
import { showService } from "./show.service";

class BookSeatService {
  bookingHandler = async (
    userId: string,
    showId: string,
    numberOfSeatsBooked: number,
    showDate: Date,
    seatIds: string[]
  ): Promise<{ message: string }> => {
    if (
      (await showService.isShowValid(showId)) &&
      (await seatService.isSeatValid(seatIds)) &&
      (await userService.isUserValid(userId))
    ) {
      const bookingId: string = await bookingService.addBooking(
        userId,
        showId,
        numberOfSeatsBooked,
        showDate
      );

      const insertData: dataDTO[] = [];
      dataMapHelper.dataMap(bookingId, showId, seatIds, insertData);

      await bookedSeatService.addSeat(bookingId, insertData);

      return { message: "Successfully booked your seat" };
    } else {
      return { message: "Invalid Parameters" };
    }
  };
}

export const bookSeatService = new BookSeatService();
