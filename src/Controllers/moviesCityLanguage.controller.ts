import { Request,Response } from "express";
import { moviesIncityByLanguageservice } from "../services/moviesCityLanguage.service";

class MoviesInCityByLanguageController{
    getAllMoviesInCityByLanguage = (req: Request,res: Response) => {
        try{
            const {language,cityId} = req.params;
            const movies = moviesIncityByLanguageservice.getAllMoviesInCityByLanguage(language,cityId);
            res.json(movies);
        }catch(error){
            res.status(400).send("Error!")
        }
    };
}
export const moviesInCityByLanguageController = new MoviesInCityByLanguageController();