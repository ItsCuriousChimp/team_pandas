import { Router } from "express";
import {movieDetailsController} from "../controllers/movieDetails.controller";

const movieDetailsRouter = Router();

movieDetailsRouter
  .route("/")
  .get([movieDetailsController.getMovieDetails]);

export default movieDetailsRouter;