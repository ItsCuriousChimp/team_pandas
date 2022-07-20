import { Router } from "express";
import { accountController } from "../controllers/logout.controller";

const logoutRouter: Router = Router();

logoutRouter.route("/").post([accountController.RemoveToken]);

export default logoutRouter;