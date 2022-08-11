import { Router } from "express";
import { validate } from "express-validation";
import { movieController } from "../controllers/movie.controller";
import { cityValidator } from "../common/validators/city.validator";
import { authorize } from "../middleware/auth.middleware";

const router = Router();

router
  .route("/")
  .get([
    authorize,
    validate(cityValidator),
    movieController.getAllMoviesInCity,
  ]);

export { router as movieRouter };
