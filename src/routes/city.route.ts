import { Router } from "express";
import { cityController } from "../controllers/city.controller";

const router: Router = Router();

router.route("/login").get([cityController.getAllCities]);

// TO-DO: Forgot Password API

export { router as authRouter };
