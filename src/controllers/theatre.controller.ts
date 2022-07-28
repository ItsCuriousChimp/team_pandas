import { theatreService } from "../services/theatre.service";
import { Request, Response, NextFunction } from "express";
import logger from "../common/logger/logger";

class TheatreController {
  getShowsWithStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info(
        "get availability status of shows in a theatre playing a movie",
        {
          queries: { ...req.query },
          __filename,
          functionName: "getShowsWithStatus",
        }
      );
      const theatreId: string = req.query.theatreId as string;
      const movieId: string = req.query.movieId as string;
      const showModels = await theatreService.getShowsWithStatus(
        theatreId,
        movieId
      );
      logger.info("sucessful retrieval of shows with availibility status", {
        __filename,
        functionName: "getShowsWithStatus",
      });

      res.send(showModels);
    } catch (err) {
      console.log("unable to get shows");
      next(err);
    }
  };
  getAvailableSeatsOfShow = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("get available seats of a show", {
        queries: { ...req.query },
        __filename,
        functionName: "getShowsWithStatus",
      });

      const showId: string = req.query.showId as string;
      const seatModels = await theatreService.getAvailableSeatsOfShow(showId);
      logger.info("sucessful in fetching available seats of show", {
        __filename,
        functionName: "getShowsWithStatus",
      });

      res.send(seatModels);
    } catch (err) {
      console.log("unable to get available seats");
      next(err);
    }
  };
}
export const theatreController = new TheatreController();
