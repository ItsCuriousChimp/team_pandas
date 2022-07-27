import { Theatre } from "../models/theatre.model";
import { theatreRespository } from "../repositories/theatre.repository";
import logger from "../common/logger/logger";
import { Movie } from "../models/movie.model";
import { City } from "../models/city.model";

class TheatreService {
  isQueryValid = async (movieId: string, cityId: string): Promise<boolean> => {
    try {
      const isMovieValid: Movie | null = await theatreRespository.getMovie(
        movieId
      );
      const isCityValid: City | null = await theatreRespository.getCity(cityId);
      return isCityValid && isMovieValid ? true : false;
    } catch (err) {
      logger.error({
        error: err,
        __filename,
        message: "cannot check query",
      });
      throw err;
    }
  };

  getTheatreAndShowTimeWithMovie = async (
    movieId: string,
    cityId: string
  ): Promise<Theatre[]> => {
    try {
      if (await this.isQueryValid(movieId, cityId))
        return await theatreRespository.getTheatreAndShowTimeWithMovie(
          movieId,
          cityId
        );
      throw new Error("Invalid id");
    } catch (err) {
      logger.error({
        error: err,
        __filename,
        message: "Cannot find theatres",
      });
      throw err;
    }
  };
}

export const theatreService: TheatreService = new TheatreService();
