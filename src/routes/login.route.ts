import { Router } from "express";
import { validate } from "express-validation";
import { loginValidation } from "../common/validators/login.validator";
import { authController } from "../controllers/auth.controller";

const router: Router = Router();

router.route("/").post([validate(loginValidation), authController.getToken]);

export { router as loginRouter };
