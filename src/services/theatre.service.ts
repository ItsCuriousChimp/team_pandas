import { Theatre } from "../models/theatre.model";
import { theatreRespository } from "../repositories/theatre.repository";
import { Movie } from "../models/movie.model";
import { City } from "../models/city.model";

class TheatreService {
  isQueryValid = async (movieId: string, cityId: string): Promise<boolean> => {
    const isMovieValid: Movie | null = await theatreRespository.getMovie(
      movieId
    );
    const isCityValid: City | null = await theatreRespository.getCity(cityId);
    return isCityValid && isMovieValid ? true : false;
  };

  getTheatreAndShowTimeWithMovie = async (
    movieId: string,
    cityId: string
  ): Promise<Theatre[]> => {
    if (await this.isQueryValid(movieId, cityId))
      return await theatreRespository.getTheatreAndShowTimeWithMovie(
        movieId,
        cityId
      );
    throw new Error("Invalid id");
  };
}

export const theatreService: TheatreService = new TheatreService();
