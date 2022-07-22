import logger from "../common/logger/logger";
import { Movie } from "../models/movie.model";
import { movieRepository } from "../repositories/movie.repository";

class MovieService {
  isCityValid = async (cityId: string): Promise<boolean> => {
    return await movieRepository.isCityValid(cityId);
  };

  getAllMoviesInCity = async (
    cityId: string
  ): Promise<Movie[] | { message: string }> => {
    try {
      if (await this.isCityValid(cityId))
        return await movieRepository.getAllMoviesInCity(cityId);
      return {
        message: "No such city found. Check city id again.",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error({
        level: "error",
        message: "Cannot search for movies in city",
      });
      throw err;
    }
  };
}

export const movieService = new MovieService();
