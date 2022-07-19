import { moviesInCityService } from "../services/movies.service";
import { Request, Response } from "express";

class MoviesInCityController {
  async getAllMoviesInCity(req: Request, res: Response) {
    const movieResponse = await moviesInCityService.getAllMoviesInCity(
      req.query.id as string
    );
    res.json(movieResponse);
  }
}

export const moviesInCityController = new MoviesInCityController();
