import { Router } from "express";
import { moviesInCityByLanguageController } from "../controllers/moviesCityLanguage.controller";

const moviesCityLanguageRouter = Router();

moviesCityLanguageRouter
  .route("/")
  .get([moviesInCityByLanguageController.getAllMoviesInCityByLanguage]);

export default moviesCityLanguageRouter;