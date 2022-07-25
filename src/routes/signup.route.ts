import { Router } from "express";
// import { validate } from "express-validation";
// import { signupValidation } from "../common/validators/signup.validator";
import { signupController } from "../controllers/signup.controller";

const router: Router = Router();

// router.route("/").post([validate(signupValidation), signupController.registerUser]);

export default router;
