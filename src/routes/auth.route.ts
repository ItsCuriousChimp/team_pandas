import { Router } from "express";
import { validate } from "express-validation";
import { loginValidation } from "../common/validators/login.validator";
import { authController } from "../controllers/auth.controller";
import { signupValidation } from "../common/validators/signup.validator";

const router: Router = Router();

router.route("/login").post([validate(loginValidation), authController.login]);

router
  .route("/signup")
  .post([validate(signupValidation), authController.registerUser]);

// TO-DO: Forgot Password API

export { router as authRouter };
