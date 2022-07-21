import { Router } from "express";
import { movieController } from "../controllers/movie.controller";

const router = Router();

router.route("/").get([movieController.getAllMoviesInCity]);

export { router as movieRouter };
