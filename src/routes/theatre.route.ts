import TheatreControllerInstance from "../controllers/theatre.controller";
import { Router } from "express";

const router = Router();
// view availability status of each show for a particular theatre and movie

// router.route('/:theatreId/show').get([TheatreControllerInstance.getMovieShows]);
router.get("/:theatreId/show", TheatreControllerInstance.getMovieShows);

// view availabile seats of a particular showTime
router
  .route("/:theatreId/show/seat")
  .get([TheatreControllerInstance.getAvailableSeatsOfShow]);

export default router;
