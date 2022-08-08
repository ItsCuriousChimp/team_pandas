import { Seat } from "../models/seat.model";
import { seatRepository } from "../repositories/seat.repository";

class SeatService {
  isSeatValid = async (seatIds: string[]): Promise<boolean> => {
    const seats: Seat[] = await seatRepository.getSeats(seatIds);
    return seats.length === seatIds.length ? true : false;
  };
}

export const seatService = new SeatService();
