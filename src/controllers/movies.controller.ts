import moviesInCityServices from "../services/movies.service";
import { Request, Response } from "express";

class MoviesInCityController {
  async getAllMoviesInCity(req: Request, res: Response) {
    const movieResponse = await moviesInCityServices.getAllMoviesInCity(
      req.query.id as string
    );
    res.json(movieResponse);
  }
}

const moviesInCityController = new MoviesInCityController();
export default moviesInCityController;
