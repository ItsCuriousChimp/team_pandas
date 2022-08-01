import { Movie } from "../models/movie.model";
import { movieRepository } from "../repositories/movieDetails.repository";

class MovieDetailsService {
  getMovieDetails = async (movieId: string): Promise<Movie[]> => {
    try {
      const movieDetails = await movieRepository.getMovieDetails(movieId);
      return movieDetails;
    } catch (error) {
      console.log("unable to fetch movie details");
      throw error;
    }
  };
}
export const movieDetailsservice = new MovieDetailsService();
