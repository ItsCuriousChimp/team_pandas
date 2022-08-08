/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import logger from "../common/logger/logger";
import { movieService } from "../services/movie.service";

class MovieController {
  getMoviesByLanguage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const movies = await movieService.getMoviesByLanguage(
        req.query.language as string,
        req.query.cityId as string
      );

      logger.info("Successfully filtered movie");

      res.status(200).json(movies);
    } catch (error: any) {
      next(error);
    }
  };
}
export const movieController = new MovieController();
