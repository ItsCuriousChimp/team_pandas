import { Request, Response, NextFunction } from "express";
import { movieDetailsservice } from "../services/movieDetails.service";

class MovieDetailsController {
  getMovieDetails = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { movieId } = req.params;
      const movieDetails = movieDetailsservice.getMovieDetails(movieId);
      res.json(movieDetails);
    } catch (error) {
      next(error);
    }
  };
}
export const movieDetailsController = new MovieDetailsController();
