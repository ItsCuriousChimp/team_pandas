import { movieService } from "../services/movie.service";
import { Request, Response } from "express";
import logger from "../common/logger/logger";

class MovieController {
  getAllMoviesInCity = async (req: Request, res: Response) => {
    try {
      const movieResponse = await movieService.getAllMoviesInCity(
        req.query.cityId as string
      );
      res.json(movieResponse);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error({
        level: "error",
        message: `Cannot send movies playing in a city`,
      });
      res.json(err);
    }
  };
}

export const movieController = new MovieController();
