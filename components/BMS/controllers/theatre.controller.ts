import TheatreWithMovieServiceInstance from "../services/theatre.service";
import { Request, Response } from "express";
class TheatreWithMovieController {
  getTheatreAndShowTimeWithMovie = async (req: Request, res: Response) => {
    const theatreAndShowTImeWithMovieResponse =
      await TheatreWithMovieServiceInstance.getTheatreAndShowTimeWithMovie(
        req.query.movieId as string,
        req.query.cityId as string
      );
    res.send(theatreAndShowTImeWithMovieResponse);
  };
}

const TheatreWithMovieControllerInstance = new TheatreWithMovieController();
export default TheatreWithMovieControllerInstance;
