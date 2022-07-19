import { Movie } from "../models/movie.model";
import { moviesInCityByLanguageRepository } from "../repositories/moviesCityLanguage.repository";

class MoviesInCityByLanguageService{
    getAllMoviesInCityByLanguage = async (language:string,city:string):Promise<Movie[]> => {
        try{
            const movies = await moviesInCityByLanguageRepository.getAllMoviesInCityByLanguage(language,city);
            return movies;
        }
        catch(error){
            throw(error);
        }
    };
}
export const moviesIncityByLanguageservice = new MoviesInCityByLanguageService();