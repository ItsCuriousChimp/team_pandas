import { Request, Response } from "express";
import { movieService } from "../services/movie.service";

class MovieController {
  getMoviesByLanguage = (req: Request, res: Response) => {
    try {
      const movies = movieService.getMoviesByLanguage(
        req.query.language as string,
        req.query.cityId as string
      );
      res.json(movies);
    } catch (error) {
      res.status(400).send("Error!");
    }
  };
}
export const movieController = new MovieController();
