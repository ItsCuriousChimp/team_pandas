import { Movie } from "../models/movie.model";
import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";

class MovieRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  getMovie = async (movieId: string): Promise<Movie | null> => {
    try {
      logger.info("get Movie", {
        movieId,
        __filename,
        functionName: "getMovie",
      });

      const movie = await this.prisma.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      logger.info("fetching movie successful", {
        __filename,
        functionName: "getMovie",
      });

      return movie;
    } catch (err) {
      console.log("unable to fetch movie");
      // throw new CustomError({
      //   ...err,
      //   data: movieId,
      //   statusCode: 500,
      //   message: "Unable to fetch movie",
      // });
      throw err;
    }
  };
}
export const movieRepository = new MovieRepository();
