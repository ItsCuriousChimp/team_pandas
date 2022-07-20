import { Router } from "express";
import { validate } from "express-validation";
import { loginValidation } from "../common/validators/login.validator";
import { accountController } from "../controllers/login.controller";

const router: Router = Router();

router.route("/").post([validate(loginValidation), accountController.getToken]);

export default router;
