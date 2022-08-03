import { Request, Response, NextFunction } from "express";
import { movieservice } from "../services/movie.service";

class MovieController {
  getMovieDetails = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { movieId } = req.params;
      const movieDetails = movieservice.getMovieDetails(movieId);
      res.json(movieDetails);
    } catch (error) {
      next(error);
    }
  };
}
export const movieController = new MovieController();
