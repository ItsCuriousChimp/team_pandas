import { Router } from "express";
import { validate } from "express-validation";
import { bookSeatValidation } from "../common/validators/bookSeat.validator";
import { bookSeatController } from "../controllers/bookSeat.controller";
import { authorize } from "../middleware/auth.middleware";

const router: Router = Router();

router
  .route("/bookSeat")
  .post([authorize, validate(bookSeatValidation), bookSeatController.bookSeat]);

export { router as showRouter };
