import { theatreController } from "../controllers/theatre.controller";
import { Router } from "express";
import { authorize } from "../middleware/auth.middleware";
import { validate } from "express-validation";
import { seatValidation } from "../common/validators/seat.validator";
import { showValidation } from "../common/validators/show.validator";

const router = Router();
// view availability status of each show for a particular theatre and movie

router
  .route("/show")
  .get([
    authorize,
    validate(showValidation),
    theatreController.getShowsWithStatus,
  ]);

// view availabile seats of a particular showTime
router
  .route("/show/seat")
  .get([
    authorize,
    validate(seatValidation),
    theatreController.getAvailableSeatsOfShow,
  ]);

export { router as theatreRouter };
