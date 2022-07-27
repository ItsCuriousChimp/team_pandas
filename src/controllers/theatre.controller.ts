import { theatreService } from "../services/theatre.service";
import { NextFunction, Request, Response } from "express";
import logger from "../common/logger/logger";
class TheatreController {
  getTheatreAndShowTimeWithMovie = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const theatreAndShowTimeWithMovieResponse =
        await theatreService.getTheatreAndShowTimeWithMovie(
          req.query.movieId as string,
          req.query.cityId as string
        );
      res.status(202).send(theatreAndShowTimeWithMovieResponse);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      logger.error({
        error: error,
        __filename,
        message: "cannot check query",
      });
      next(error);
    }
  };
}

export const theatreController = new TheatreController();
