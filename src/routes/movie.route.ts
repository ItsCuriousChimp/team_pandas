import { Router } from "express";
import { validate } from "express-validation";
import { movieDetailsValidation } from "../common/validators/movieDetails.validator";
import { movieController } from "../controllers/movie.controller";

const router: Router = Router();

router
  .route("/details")
  .get([validate(movieDetailsValidation), movieController.getMovieDetails]);

export { router as movieRouter };
