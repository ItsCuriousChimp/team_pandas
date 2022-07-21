import { Theatre } from "../models/theatre.model";
import { theatreRespository } from "../repositories/theatre.repository";

class TheatreService {
  getTheatreAndShowTimeWithMovie = async (
    movieId: string,
    cityId: string
  ): Promise<Theatre[]> => {
    return await theatreRespository.getTheatreAndShowTimeWithMovie(
      movieId,
      cityId
    );
  };
}

export const theatreService: TheatreService = new TheatreService();
