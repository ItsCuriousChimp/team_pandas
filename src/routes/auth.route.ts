import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authorize } from "../middleware/auth.middleware";
import { redisHelper } from "../common/helpers/redis.helper";

const router: Router = Router();

//start redis connection
(async () => {
  await redisHelper.getConnection().connect();
  return redisHelper.getConnection();
})();

router.route("/logout").get([authorize, authController.logout]);

export default router;
