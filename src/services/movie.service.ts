import logger from "../common/logger/logger";
import { Movie } from "../models/movie.model";
import { movieRepository } from "../repositories/movie.repository";

class MovieService {
  isCityValid = async (cityId: string): Promise<boolean> => {
    return (await movieRepository.getCity(cityId)) ? true : false;
  };

  getAllMoviesInCity = async (cityId: string): Promise<Movie[]> => {
    try {
      if (await this.isCityValid(cityId))
        return await movieRepository.getAllMoviesInCity(cityId);
      throw new Error("Invalid City id");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error({
        message: "Cannot search for movies in city",
        error: err,
        __filename,
      });
      throw err;
    }
  };
}

export const movieService = new MovieService();
