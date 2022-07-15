import { Movie } from "../../../common/models/movie.model";
import { PrismaClient } from '@prisma/client';
import logger from "../../../common/logger";

class MoviesInCityByLanguageRepository{
    prisma:PrismaClient;
    constructor(){
        this.prisma = new PrismaClient();
    }
    public async getAllMoviesInCityByLanguage(language: string,cityId: string): Promise<Movie[]>{
        try{
            const movies: Movie[] = await this.prisma.$queryRawUnsafe(
                `SELECT DISTINCT MV.* from Theatre TH
				                      INNER JOIN Screen as SC
				                      on SC.theatreId = TH.id
				                      INNER JOIN Show as SH on
				                      SH.screenId = SC.id
				                      INNER JOIN Movie as MV on
				                      MV.id = SH.movieId WHERE (TH.cityId = ${cityId} AND MV.language = ${language})`
            )
            return movies;
        }catch(err){
            logger.error("Messsage",err);
            throw err;
        }
    }
}
export const moviesInCityByLanguageRepository = new MoviesInCityByLanguageRepository();