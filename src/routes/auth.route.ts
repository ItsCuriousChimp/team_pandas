import { Router } from "express";
import { validate } from "express-validation";
import { signupValidation } from "../common/validators/signup.validator";
import { authController } from "../controllers/auth.controller";
import { authorize } from "../middleware/auth.middleware";

const router: Router = Router();

// router.route("/").post([validate(signupValidation), signupController.registerUser]);

router
  .route("/signup")
  .post([authorize, validate(signupValidation), authController.registerUser]);

router.route("/logout").get([authorize, authController.logoutUser]);

export default router;
