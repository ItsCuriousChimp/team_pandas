import { Router } from "express";
import { moviesInCityController } from "../controllers/movies.controller";

const router = Router();

router.route("/").get([moviesInCityController.getAllMoviesInCity]);

export default router;
