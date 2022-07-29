import { userController } from "../controllers/user.controller";
import { Router } from "express";
import { authorize } from "../middleware/auth.middleware";
import { validate } from "express-validation";
import { userValidation } from "../common/validators/user.validator";

const router = Router();
// update details of user

router
  .route("/show")
  .put([authorize, validate(userValidation), userController.updateUser]);

export default router;
