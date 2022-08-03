/* eslint-disable no-useless-catch */
import { Movie } from "../models/movie.model";
import { movieRepository } from "../repositories/movie.repository";

class MovieService {
  getMovieDetails = async (movieId: string): Promise<Movie[]> => {
    try {
      const movieDetails = await movieRepository.getMovieDetails(movieId);
      return movieDetails;
    } catch (error) {
      throw error;
    }
  };
}
export const movieservice = new MovieService();
