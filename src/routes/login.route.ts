import { Router } from "express";
import { accountController } from "../controllers/login.controller";

const router: Router = Router();

router.route("/").post([accountController.getToken]);

export default router;
