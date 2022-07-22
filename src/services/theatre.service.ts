import { Theatre } from "../models/theatre.model";
import { theatreRespository } from "../repositories/theatre.repository";
import logger from "../common/logger/logger";

class TheatreService {
  isQueryValid = async (movieId: string, cityId: string): Promise<boolean> => {
    try {
      const isMovieValid: boolean = await theatreRespository.isMovieValid(
        movieId
      );
      const isCityValid: boolean = await theatreRespository.isCityValid(cityId);
      if (isCityValid && isMovieValid) return true;
      return false;
    } catch (err) {
      logger.error({
        level: "error",
        message: "cannot check query",
      });
      throw err;
    }
  };

  getTheatreAndShowTimeWithMovie = async (
    movieId: string,
    cityId: string
  ): Promise<Theatre[] | { message: string }> => {
    try {
      if (await this.isQueryValid(movieId, cityId))
        return await theatreRespository.getTheatreAndShowTimeWithMovie(
          movieId,
          cityId
        );
      return {
        message: "No such theatre found",
      };
    } catch (err) {
      logger.error({
        level: "error",
        message: "Cannot find theatres",
      });
      throw err;
    }
  };
}

export const theatreService: TheatreService = new TheatreService();
