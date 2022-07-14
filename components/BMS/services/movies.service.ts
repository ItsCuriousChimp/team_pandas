import { Movie } from "../../../common/models/movie.model";
import { MoviesInCityRepository } from "../repositories/movies.repository";

export class MoviesInCityServices {
  moviesInCityRepositoryInstance: MoviesInCityRepository;

  constructor() {
    this.moviesInCityRepositoryInstance = new MoviesInCityRepository();
  }
  async getAllMoviesInCity(id: string): Promise<Movie[]> {
    return await this.moviesInCityRepositoryInstance.getAllMoviesInCity(id);
  }
}

const moviesInCityServicesInstance = new MoviesInCityServices();
export default moviesInCityServicesInstance;
