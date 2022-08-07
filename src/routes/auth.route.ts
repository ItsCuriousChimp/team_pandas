import { Router } from "express";
import { validate } from "express-validation";
import { loginValidation } from "../common/validators/login.validator";
import { authController } from "../controllers/auth.controller";

const router: Router = Router();

router.route("/login").post([validate(loginValidation), authController.login]);

// TO-DO: Forgot Password API

export { router as authRouter };
