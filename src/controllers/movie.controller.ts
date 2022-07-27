import { movieService } from "../services/movie.service";
import { NextFunction, Request, Response } from "express";
import logger from "../common/logger/logger";

class MovieController {
  getAllMoviesInCity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const movieResponse = await movieService.getAllMoviesInCity(
        req.query.cityId as string
      );
      res.status(202).json(movieResponse);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error({
        error: err,
        __filename,
        message: `Cannot send movies playing in a city`,
      });
      next(err);
    }
  };
}

export const movieController = new MovieController();
