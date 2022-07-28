import { theatreRepository } from "../repositories/show.repository";
import { showRepository } from "../repositories/seat.repository";
import { Show } from "../models/show.model";
import { Seat } from "../models/seat.model";
import logger from "../common/logger/logger";

class TheatreService {
  async getShowsWithStatus(
    theatreId: string,
    movieId: string
  ): Promise<Show[]> {
    try {
      logger.info("get shows with status", {
        theatreId,
        movieId,
        __filename,
        functionName: "getShowsWithStatus",
      });

      const showModels: Show[] =
        await theatreRepository.getShowsOfTheatreAndMovie(theatreId, movieId);
      for (let i = 0; i < showModels.length; i += 1) {
        const totalNumberOfSeats = showModels[i].totalSeatCount as number;
        const totalNumberOfBookedSeats = showModels[i]
          .bookedSeatCount as number;
        const emptySeats: number =
          totalNumberOfSeats - totalNumberOfBookedSeats;
        if (emptySeats === 0) {
          showModels[i].availablityStatus = "Not Available";
        } else if (emptySeats <= 10) {
          showModels[i].availablityStatus = "Filling Fast";
        } else {
          showModels[i].availablityStatus = "Available";
        }
      }
      logger.info("setting availability status successful", {
        __filename,
        functionName: "getShowsWithStatus",
      });
      return showModels;
    } catch (err) {
      console.log("unable to get shows");
      throw err;
    }
  }

  async getAvailableSeatsOfShow(showId: string): Promise<Seat[]> {
    try {
      logger.info("get available seats of show", {
        showId,
        __filename,
        functionName: "getAvailableSeatsOfShow",
      });

      const seatModels: Seat[] = await showRepository.getAvailableSeatsOfShow(
        showId
      );
      logger.info("fetching available seats successful", {
        __filename,
        functionName: "getAvailableSeatsOfShow",
      });
      return seatModels;
    } catch (err) {
      console.log("unable to get available seats");
      throw err;
    }
  }
}
export const theatreService = new TheatreService();
