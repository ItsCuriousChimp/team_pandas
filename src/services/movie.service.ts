import { Movie } from "../models/movie.model";
import { movieRepository } from "../repositories/movie.repository";

class MovieService {
  async getAllMoviesInCity(cityId: string): Promise<Movie[]> {
    return await movieRepository.getAllMoviesInCity(cityId);
  }
}

export const movieService = new MovieService();
