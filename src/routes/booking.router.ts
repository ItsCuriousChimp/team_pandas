import { Router } from "express";
import { validate } from "express-validation";
import { authorize } from "../middleware/auth.middleware";
import { userIdValidation } from "../common/validators/booking.validator";
import { bookingController } from "../controllers/booking.controller";

const router = Router();

router
  .route("/")
  .get([
    authorize,
    validate(userIdValidation),
    bookingController.getBookingDetails,
  ]);

export { router as bookingRouter };
