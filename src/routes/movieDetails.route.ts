import { Router } from "express";
import {movieDetailsController} from "../Controllers/movieDetails.controller";

const movieDetailsRouter = Router();

movieDetailsRouter
  .route("/")
  .get([movieDetailsController.getMovieDetails]);

export default movieDetailsRouter;