import { theatreRepository } from "../repositories/theatre.repository";
import { showRepository } from "../repositories/show.repository";
import { Show } from "../models/show.model";
import { Seat } from "../models/seat.model";
class TheatreService {
  async getShowsOfMovie(
    theatreIdUrl: string,
    movieIdUrl: string
  ): Promise<Show[]> {
    const showModels: Show[] = await theatreRepository.getShowsOfMovie(
      theatreIdUrl,
      movieIdUrl
    );
    for (let i = 0; i < showModels.length; i += 1) {
      const totalNumberOfSeats = showModels[i].totalSeatCount as number;
      const totalNumberOfBookedSeats = showModels[i].bookedSeatCount as number;
      const emptySeats: number = totalNumberOfSeats - totalNumberOfBookedSeats;
      if (emptySeats === 0) {
        showModels[i].availablityStatus = "Not Available";
      } else if (emptySeats <= 10) {
        showModels[i].availablityStatus = "Filling Fast";
      } else {
        showModels[i].availablityStatus = "Available";
      }
    }
    return showModels;
  }
  async getAvailableSeatsOfShow(
    theatreIdUrl: string,
    movieIdUrl: string,
    showIdUrl: string
  ): Promise<Seat[]> {
    const seatModels: Seat[] = await showRepository.getAvailableSeatsOfShow(
      theatreIdUrl,
      movieIdUrl,
      showIdUrl
    );
    return seatModels;
  }
}
export const theatreService = new TheatreService();
