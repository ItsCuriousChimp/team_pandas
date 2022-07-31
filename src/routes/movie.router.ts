import { Router } from "express";
import { validate } from "express-validation";
import { movieValidator } from "../common/validators/movie.validator";
import { movieController } from "../controllers/movie.controller";

const router: Router = Router();

router
  .route("/language")
  .get([validate(movieValidator), movieController.getMoviesByLanguage]);

export { router as movieRouter };
