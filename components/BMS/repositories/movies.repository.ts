import { PrismaClient } from "@prisma/client";
import { Movie } from "../../../common/models/movie.model";
import logger from "../../../common/logger";

export class MoviesInCityRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getAllMoviesInCity(cityId: string): Promise<Movie[]> {
    try {
      const movies: Movie[] = await this.prisma.$queryRawUnsafe(
        `select distinct mv.* from theatre as th
				inner join screen as sc 
				on sc."theatreId" = th.id
				inner join show as sh on
				sh."screenId" = sc.id
				inner join movie as mv on
				mv.id = sh."movieId" where th."cityId" = '${cityId}'`
      );

      return movies;
    } catch (err) {
      logger.error("Message", err);
      throw err;
    }
  }
}
