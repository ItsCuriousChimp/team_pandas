import { Router } from "express";
import { validate } from "express-validation";
import { bookSeatValidation } from "../common/validators/bookSeat.validator";
import { bookSeatController } from "../controllers/bookSeat.controller";

const router: Router = Router();

router
  .route("/")
  .post([validate(bookSeatValidation), bookSeatController.bookSeat]);

export { router as bookSeatRouter };
