import { Movie } from "../models/movie.model";
import { movieDetailsRepository } from "../Repositories/movieDetails.repository";


class MovieDetailsService{
    getMovieDetails = async (movieId:string):Promise<Movie[]> => {
        try{
            const movieDetails = await movieDetailsRepository.getMovieDetails(movieId);
            return movieDetails;
        }
        catch(error){
            throw(error);
        }
    };
}
export const movieDetailsservice = new MovieDetailsService();