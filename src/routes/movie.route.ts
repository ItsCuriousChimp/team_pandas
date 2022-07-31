import { Router } from "express";
import { validate } from "express-validation";
import { movieController } from "../controllers/movie.controller";
import { cityValidator } from "../common/validators/city.validator";

const router = Router();

router
  .route("/")
  .get(validate(cityValidator), [movieController.getAllMoviesInCity]);

export { router as movieRouter };
