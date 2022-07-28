import { showRepository } from "../repositories/show.repository";
import { seatRepository } from "../repositories/seat.repository";
import { movieRepository } from "../repositories/movie.repository";
import { theatreRepository } from "../repositories/theatre.repository";
import { Show } from "../models/show.model";
import { Seat } from "../models/seat.model";
import { Movie } from "../models/movie.model";
import { Theatre } from "../models/theatre.model";
import logger from "../common/logger/logger";

class TheatreService {
  isMovieValid = async (id: string): Promise<boolean> => {
    try {
      logger.info("is movie Id valid", {
        movieId: id,
        __filename,
        functionName: "isMovieValid",
      });
      const getMovie: Movie | null = await movieRepository.getMovie(id);
      if ((await getMovie) == null) {
        throw new Error("Movie id incorrect");
      } else {
        return true;
      }
    } catch (err) {
      console.log("unable to get movie");
      throw err;
    }
  };
  isTheatreValid = async (id: string): Promise<boolean> => {
    try {
      logger.info("is movie Id valid", {
        theatreeId: id,
        __filename,
        functionName: "isMovieValid",
      });
      const getTheatre: Theatre | null = await theatreRepository.getTheatre(id);
      if ((await getTheatre) == null) {
        throw new Error("Movie id incorrect");
      } else {
        return true;
      }
    } catch (err) {
      console.log("unable to get theatre");
      throw err;
    }
  };
  isShowValid = async (id: string): Promise<boolean> => {
    try {
      logger.info("is movie Id valid", {
        showId: id,
        __filename,
        functionName: "isMovieValid",
      });
      const getShow: Show | null = await showRepository.getShow(id);
      if ((await getShow) == null) {
        throw new Error("Show id incorrect");
      } else {
        return true;
      }
    } catch (err) {
      console.log("unable to get show");
      throw err;
    }
  };

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
      //check for query validations
      await this.isMovieValid(movieId);
      await this.isTheatreValid(theatreId);
      //fetching shows with a specific theatreId and and movieId

      const showModels: Show[] = await showRepository.getShowsOfTheatreAndMovie(
        theatreId,
        movieId
      );
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
      //check for query validations
      await this.isShowValid(showId);
      //fetching available seats of a showId
      const seatModels: Seat[] = await seatRepository.getAvailableSeatsOfShow(
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
