import { theatreWithMovieService } from "../services/theatre.service";
import { Request, Response } from "express";
class TheatreWithMovieController {
  getTheatreAndShowTimeWithMovie = async (req: Request, res: Response) => {
    const theatreAndShowTImeWithMovieResponse =
      await theatreWithMovieService.getTheatreAndShowTimeWithMovie(
        req.query.movieId as string,
        req.query.cityId as string
      );
    res.send(theatreAndShowTImeWithMovieResponse);
  };
}

export const theatreWithMovieController = new TheatreWithMovieController();
