import { Router } from "express";
import { movieController } from "../controllers/movie.controller";
import { validate } from "express-validation";
import { movieDetailsValidation } from "../common/validators/movieDetails.validator";

const movieDetailsRouter = Router();

movieDetailsRouter
  .route("/details")
  .get([validate(movieDetailsValidation), movieController.getMovieDetails]);

export default movieDetailsRouter;
