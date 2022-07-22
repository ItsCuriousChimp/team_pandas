import { Router } from "express";
import { movieController } from "../controllers/movie.controller";
import { cityValidator } from "../common/validators/city.validator";
import { validate } from "express-validation";
const router = Router();

router
  .route("/")
  .get(validate(cityValidator), [movieController.getAllMoviesInCity]);

export { router as movieRouter };
