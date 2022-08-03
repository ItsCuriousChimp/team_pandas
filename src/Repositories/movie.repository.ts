/* eslint-disable @typescript-eslint/no-explicit-any */
import { Movie } from "../models/movie.model";
import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";
import { dbClient } from "./dbClient";
import CustomError from "../common/utils/customErrors/customError";

class MovieRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = dbClient.prisma;
  }
  public async getMovieDetails(movieId: string): Promise<Movie[]> {
    try {
      logger.info("get movie details", {
        movieId: movieId,
        __filename,
        functionName: "getMovieDetails",
      });

      const Movie: Movie[] = await this.prisma.$queryRawUnsafe(
        `SELECT MV.* , SH.availableUntilUtc from Movie MV
				                      INNER JOIN Show as SH
				                      on SH.movieId = MV.id
				                      WHERE MV.Id = ${movieId}`
      );

      logger.info("movie details fetched successfully", {
        movieId: movieId,
        __filename,
        functionName: "getMovieDetails",
      });

      return Movie;
    } catch (error: any) {
      throw new CustomError({
        ...error,
        data: movieId,
        statusCode: 500,
        message: "Unable to fetch details of movie",
      });
    }
  }
}
export const movieRepository = new MovieRepository();
