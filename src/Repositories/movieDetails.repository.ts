import { Movie } from '../models/movie.model';
import { PrismaClient } from '@prisma/client';
import logger from "../../common/logger";

class MovieDetailsRepository{
    prisma:PrismaClient;
    constructor(){
        this.prisma = new PrismaClient();
    }
    public async getMovieDetails(movieId: string): Promise<Movie[]>{
        try{
            const movieDetails: Movie[] = await this.prisma.$queryRawUnsafe(
                `SELECT MV.* , SH.availableUntilUtc from Movie MV
				                      INNER JOIN Show as SH
				                      on SH.movieId = MV.id
				                      WHERE MV.Id = ${movieId}`
            )
            return movieDetails;
        }catch(err){
            logger.error("Messsage",err);
            throw err;
        }
    }
}
export const movieDetailsRepository = new MovieDetailsRepository();