import { TheatreRepository } from "../repositories/theatre.repository";
import { ShowRepository } from "../repositories/show.repository";
import { Show } from "../models/show.model";
import { Seat } from "../models/seat.model";
export class TheatreService {
  async getShowsOfMovie(
    theatreIdUrl: string,
    movieIdUrl: string
  ): Promise<Show[]> {
    const theatreRepository = new TheatreRepository();
    const showModels: Show[] = await theatreRepository.getShowsOfMovie(
      theatreIdUrl,
      movieIdUrl
    );
    for (let i = 0; i < showModels.length; i += 1) {
      const totalNumberOfSeats = showModels[i].totalSeatsCount as number;
      const totalNumberOfBookedSeats = showModels[i].bookedSeatsCount as number;
      const emptySeats: number = totalNumberOfSeats - totalNumberOfBookedSeats;
      showModels[i].availableSeatsCount = emptySeats;
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
    const ShowRepositoryInstance = new ShowRepository();
    const seatModels: Seat[] =
      await ShowRepositoryInstance.getAvailableSeatsOfShow(
        theatreIdUrl,
        movieIdUrl,
        showIdUrl
      );
    return seatModels;
  }
}
