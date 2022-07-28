import TheatreControllerInstance from "../controllers/theatre.controller";
import { Router } from "express";
import { authorize } from "../middleware/auth.middleware";
import { validate } from "express-validation";
import { seatValidation } from "../common/validators/seat.validator";
import { showValidation } from "../common/validators/show.validator";

const router = Router();
// view availability status of each show for a particular theatre and movie

router
  .route("/:theatreId/show")
  .get([
    authorize,
    validate(showValidation),
    TheatreControllerInstance.getMovieShows,
  ]);

// view availabile seats of a particular showTime
router
  .route("/:theatreId/show/seat")
  .get([
    authorize,
    validate(seatValidation),
    TheatreControllerInstance.getAvailableSeatsOfShow,
  ]);

export default router;
