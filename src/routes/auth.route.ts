import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authorize } from "../middleware/auth.middleware";

const router: Router = Router();

router.route("/logout").get([authorize, authController.logout]);

export default router;
