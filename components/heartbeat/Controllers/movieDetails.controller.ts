import { Request,Response } from "express";
import { movieDetailsservice } from "../Services/movieDetails.service";

class MovieDetailsController{
    getMovieDetails = (req: Request,res: Response) => {
        try{
            const {movieId} = req.params;
            const movieDetails = movieDetailsservice.getMovieDetails(movieId);
            res.json(movieDetails);
        }catch(error){
            res.status(400).send("Error!")
        }
    };
}
export const movieDetailsController = new MovieDetailsController();