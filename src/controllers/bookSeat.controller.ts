import { NextFunction, Request, Response } from "express";
import { bookSeatService } from "../services/bookSeat.service";
import logger from "../common/logger/logger";

class BookSeatController {
  bookSeat = async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.body.userId as string;
    const showId: string = req.body.showId as string;
    const showDate: Date = new Date(req.body.showDate as string);
    const seatIds: string[] = req.body.seatIds;

    try {
      const bookSeatServiceResponse = await bookSeatService.bookingHandler(
        userId,
        showId,
        seatIds.length,
        showDate,
        seatIds
      );

      res.status(201).send(bookSeatServiceResponse);
    } catch (err) {
      logger.error({
        level: "error",
        message: `Unable to book seat`,
      });

      next(err);
    }
  };
}

export const bookSeatController = new BookSeatController();
