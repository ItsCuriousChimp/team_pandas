import { movieService } from "../services/movie.service";
import { Request, Response } from "express";

class MovieController {
  async getAllMoviesInCity(req: Request, res: Response) {
    const movieResponse = await movieService.getAllMoviesInCity(
      req.query.cityId as string
    );
    res.json(movieResponse);
  }
}

export const movieController = new MovieController();
