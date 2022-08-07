import { Router } from "express";
import { theatreInputValidation } from "../common/validators/theatre.validator";
import { theatreController } from "../controllers/theatre.controller";
import { validate } from "express-validation";
import { authorize } from "../middleware/auth.middleware";

const router = Router();

router
  .route("/")
  .get([
    authorize,
    validate(theatreInputValidation),
    theatreController.getTheatreAndShowTimeWithMovie,
  ]);

export { router as theatreRouter };
