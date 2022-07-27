import { Router } from "express";
import { validate } from "express-validation";
import { signupValidation } from "../common/validators/signup.validator";
import { authController } from "../controllers/auth.controller";

const router: Router = Router();

router
  .route("/signup")
  .post([validate(signupValidation), authController.registerUser]);

export default router;
