import { theatreService } from "../services/theatre.service";
import { Request, Response } from "express";
class TheatreController {
  getTheatreAndShowTimeWithMovie = async (req: Request, res: Response) => {
    const theatreAndShowTimeWithMovieResponse =
      await theatreService.getTheatreAndShowTimeWithMovie(
        req.query.movieId as string,
        req.query.cityId as string
      );
    res.send(theatreAndShowTimeWithMovieResponse);
  };
}

export const theatreController = new TheatreController();
