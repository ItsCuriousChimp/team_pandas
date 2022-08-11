/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import CustomError from "../common/utils/customErrors/customError";
import { Movie } from "../models/movie.model";
import { movieRepository } from "../repositories/movie.repository";

class MovieService {
  isCityValid = async (cityId: string): Promise<boolean> => {
    return (await movieRepository.getCity(cityId)) ? true : false;
  };

  getMoviesByLanguage = async (
    language: string,
    cityId: string
  ): Promise<Movie[]> => {
    if (!(await this.isCityValid(cityId)))
      throw new CustomError({
        message: "Unable to find city Id",
        statusCode: 400,
        data: cityId,
      });

    const movies = await movieRepository.getMoviesByLanguage(language, cityId);

    return movies;
  };
}
export const movieService = new MovieService();
