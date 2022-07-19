import { Router } from "express";
import { theatreWithMovieController } from "../controllers/theatre.controller";

const router = Router();

router
  .route("/")
  .get([theatreWithMovieController.getTheatreAndShowTimeWithMovie]);

export default router;
