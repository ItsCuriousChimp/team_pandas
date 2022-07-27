import { bookingService } from "../services/booking.service";
import { NextFunction, Request, Response } from "express";
import logger from "../common/logger/logger";
class BookingController {
  getBookingDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bookingResponse = await bookingService.getBookingDetails(
        req.query.userId as string
      );
      res.status(202).send(bookingResponse);
    } catch (err) {
      logger.error({
        level: "error",
        message: `Cannot send bookings of the user`,
      });
      next(err);
    }
  };
}

export const bookingController = new BookingController();
