import logger from "../common/logger/logger";
import { Movie } from "../models/movie.model";
import { movieRepository } from "../repositories/movie.repository";

class MovieService {
  isCityValid = async (cityId: string): Promise<boolean> => {
    return (await movieRepository.getCity(cityId)) ? true : false;
  };

  getMoviesByLanguage = async (
    language: string,
    city: string
  ): Promise<Movie[]> => {
    try {
      const movies = await movieRepository.getMoviesByLanguage(language, city);
      return movies;
    } catch (error) {
      logger.error("Unable to fetch movies");
      throw error;
    }
  };
}
export const movieService = new MovieService();
