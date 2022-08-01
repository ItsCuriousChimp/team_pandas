import { Movie } from "../models/movie.model";
import { PrismaClient } from "@prisma/client";
import logger from "../../src/common/logger/logger";

class MovieRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  public async getMovieDetails(movieId: string): Promise<Movie[]> {
    try {
      const Movie: Movie[] = await this.prisma.$queryRawUnsafe(
        `SELECT MV.* , SH.availableUntilUtc from Movie MV
				                      INNER JOIN Show as SH
				                      on SH.movieId = MV.id
				                      WHERE MV.Id = ${movieId}`
      );
      return Movie;
    } catch (error) {
      logger.error(`Error found in MovieRepository - ${error}`);
      // throw new CustomError({
      //     ...err,
      //     data: movireId,
      //     statusCode: 500,
      //     message: "Unable to fetch details of movie",
      //   });
      throw error;
    }
  }
}
export const movieRepository = new MovieRepository();
