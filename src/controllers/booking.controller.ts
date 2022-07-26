import { bookingService } from "../services/booking.service";
import { Request, Response } from "express";
import logger from "../common/logger/logger";

class BookingController {
  getBookingDetails = async (req: Request, res: Response) => {
    try {
      const bookingResponse = await bookingService.getBookingDetails(
        req.query.userId as string
      );
      res.status(200).send(bookingResponse);
    } catch (err) {
      logger.error({
        level: "error",
        message: `Cannot send bookings of the user`,
      });
      res.status(404).json(err);
    }
  };
}

export const bookingController = new BookingController();
