import { Router } from "express";
import { validate } from "express-validation";
import { loginValidation } from "../common/validators/login.validator";
import { authController } from "../controllers/login.controller";

const router: Router = Router();

router.route("/").post([validate(loginValidation), authController.getToken]);

export default router;
