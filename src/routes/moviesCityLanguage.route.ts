import { Router } from "express";
import { moviesInCityByLanguageController } from "../controllers/moviesCityLanguage.controller";
import { movieCityLanguageValidation } from "../common/validators/movieCityLanguage.validator";
import { validate } from "express-validation";
const moviesCityLanguageRouter = Router();

moviesCityLanguageRouter
  .route("/")
  .get(validate(movieCityLanguageValidation),[moviesInCityByLanguageController.getAllMoviesInCityByLanguage]);

export default moviesCityLanguageRouter;