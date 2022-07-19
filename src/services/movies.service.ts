import { Movie } from "../models/movie.model";
import { MoviesInCityRepository } from "../repositories/movies.repository";

export class MoviesInCityServices {
  moviesInCityRepository: MoviesInCityRepository;

  constructor() {
    this.moviesInCityRepository = new MoviesInCityRepository();
  }
  async getAllMoviesInCity(id: string): Promise<Movie[]> {
    return await this.moviesInCityRepository.getAllMoviesInCity(id);
  }
}

export const moviesInCityServices = new MoviesInCityServices();
