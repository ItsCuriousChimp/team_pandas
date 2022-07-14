import moviesInCityServicesInstance from "../services/movies.service";
import { Request, Response } from "express";

class MoviesInCityController {
  async getAllMoviesInCity(req: Request, res: Response) {
    const movieResponse = await moviesInCityServicesInstance.getAllMoviesInCity(
      req.query.id as string
    );
    res.json(movieResponse);
  }
}

const moviesInCityControllerInstance = new MoviesInCityController();
export default moviesInCityControllerInstance;
