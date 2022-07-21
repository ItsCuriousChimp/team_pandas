import { Router } from "express";
import { theatreInputValidation } from "../common/validators/theatre.validator";
import { theatreController } from "../controllers/theatre.controller";
import { validate } from "express-validation";

const router = Router();

router
  .route("/")
  .get([
    validate(theatreInputValidation),
    theatreController.getTheatreAndShowTimeWithMovie,
  ]);

export { router as theatreRouter };
