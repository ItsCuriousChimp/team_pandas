import { Theatre } from "../models/theatre.model";
import theatreWithMovieRespository from "../repositories/theatre.repository";

class TheatreWithMovieService {
  getTheatreAndShowTimeWithMovie = async (
    movieId: string,
    cityId: string
  ): Promise<Theatre[]> => {
    return await theatreWithMovieRespository.getTheatreAndShowTimeWithMovie(
      movieId,
      cityId
    );
  };
}

const theatreWithMovieService: TheatreWithMovieService =
  new TheatreWithMovieService();

export default theatreWithMovieService;
