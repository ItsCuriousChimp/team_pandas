import { Router } from "express";
import { validate } from "express-validation";
import { signupValidation } from "../common/validators/signup.validator";
import { authController } from "../controllers/auth.controller";
import { redisHelper } from "../common/helpers/redis.helper";

const router: Router = Router();
//start redis connection
(async () => {
  await redisHelper.getConnection().connect();
  return redisHelper.getConnection();
})();

router
  .route("/signup")
  .post([validate(signupValidation), authController.registerUser]);

export default router;
