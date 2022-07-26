import { theatreService } from "../services/theatre.service";
import { Request, Response } from "express";
import logger from "../common/logger/logger";
class TheatreController {
  getTheatreAndShowTimeWithMovie = async (req: Request, res: Response) => {
    try {
      const theatreAndShowTimeWithMovieResponse =
        await theatreService.getTheatreAndShowTimeWithMovie(
          req.query.movieId as string,
          req.query.cityId as string
        );
      res.status(202).send(theatreAndShowTimeWithMovieResponse);
    } catch (error) {
      logger.error({
        level: "error",
        message: "cannot check query",
      });
      res
        .status(404)
        .send({ message: "Cannot get data from theatre repository" });
    }
  };
}

export const theatreController = new TheatreController();
