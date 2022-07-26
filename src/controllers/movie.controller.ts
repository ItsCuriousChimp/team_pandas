import { movieService } from "../services/movie.service";
import { Request, Response } from "express";
import logger from "../common/logger/logger";

class MovieController {
  getAllMoviesInCity = async (req: Request, res: Response) => {
    try {
      const movieResponse = await movieService.getAllMoviesInCity(
        req.query.cityId as string
      );
      res.status(202).json(movieResponse);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error({
        level: "error",
        message: `Cannot send movies playing in a city`,
      });
      res.status(404).json(err);
    }
  };
}

export const movieController = new MovieController();
