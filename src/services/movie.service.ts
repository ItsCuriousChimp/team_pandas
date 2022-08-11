/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from "../common/utils/customErrors/customError";
import { Movie } from "../models/movie.model";
import { movieRepository } from "../repositories/movie.repository";

class MovieService {
  isCityValid = async (cityId: string): Promise<boolean> => {
    return (await movieRepository.getCity(cityId)) ? true : false;
  };

  getAllMoviesInCity = async (cityId: string): Promise<Movie[]> => {
    if (!(await this.isCityValid(cityId)))
      throw new CustomError({
        message: "Invalid City",
        statusCode: 400,
        data: cityId,
      });

    return await movieRepository.getAllMoviesInCity(cityId);
  };
}

export const movieService = new MovieService();
