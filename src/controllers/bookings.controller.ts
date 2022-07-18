import bookingService from "../services/bookings.service";
import { Request, Response } from "express";

class BookingController {
  getBookingDetails = async (req: Request, res: Response) => {
    const bookingResponse = await bookingService.getBookingDetails(
      req.query.userId as string
    );
    res.send(bookingResponse);
  };
}

const bookingController = new BookingController();
export default bookingController;
