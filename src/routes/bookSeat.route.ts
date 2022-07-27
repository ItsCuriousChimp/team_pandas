import { Router } from "express";
import { validate } from "express-validation";
import { bookSeatValidation } from "../common/validators/bookSeat.validator";
import { showController } from "../controllers/show.controller";

const router: Router = Router();

router
  .route("/bookSeat")
  .post([validate(bookSeatValidation), showController.bookSeat]);

export { router as showRouter };
