import { Router } from "express";
import { bookingController } from "../controllers/booking.controller";
import { validate } from "express-validation";
import { userIdValidation } from "../common/validators/booking.validator";

const router = Router();

router
  .route("/")
  .get([validate(userIdValidation), bookingController.getBookingDetails]);

export { router as bookingRouter };
