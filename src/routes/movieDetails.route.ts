import { Router } from "express";
import { movieDetailsController } from "../controllers/movieDetails.controller";
import { validate } from "express-validation";
import { movieDetailsValidation } from "../common/validators/movieDetails.validator";

const movieDetailsRouter = Router();

movieDetailsRouter
  .route("/")
  .get([
    validate(movieDetailsValidation),
    movieDetailsController.getMovieDetails,
  ]);

export default movieDetailsRouter;
