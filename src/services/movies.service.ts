import { Movie } from "../models/movie.model";
import { moviesInCityRepository } from "../repositories/movies.repository";

export class MoviesInCityService {
  async getAllMoviesInCity(id: string): Promise<Movie[]> {
    return await moviesInCityRepository.getAllMoviesInCity(id);
  }
}

export const moviesInCityService = new MoviesInCityService();
