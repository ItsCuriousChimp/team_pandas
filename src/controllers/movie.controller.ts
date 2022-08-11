/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import logger from "../common/logger/logger";
import { movieService } from "../services/movie.service";
class MovieController {
  getAllMoviesInCity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const movieResponse = await movieService.getAllMoviesInCity(
        req.query.cityId as string
      );

      res.status(200).json(movieResponse);
    } catch (err: any) {
      logger.error({
        error: err,
        __filename,
        message: `Unable to fetch movies playing in the city`,
      });
      next(err);
    }
  };
}

export const movieController = new MovieController();
