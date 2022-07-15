import { Theatre } from "../../../common/models/theatre.model";
import TheatreWithMovieRespositoryInstance from "../repositories/theatre.repository";

class TheatreWithMovieService {
  getTheatreAndShowTimeWithMovie = async (
    movieId: string,
    cityId: string
  ): Promise<Theatre[]> => {
    return await TheatreWithMovieRespositoryInstance.getTheatreAndShowTimeWithMovie(
      movieId,
      cityId
    );
  };
}

const TheatreWithMovieServiceInstance: TheatreWithMovieService =
  new TheatreWithMovieService();

export default TheatreWithMovieServiceInstance;
