import { PrismaClient } from "@prisma/client";
import { Theatre } from "../../../common/models/theatre.model";

class TheatreWithMovieRespository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  getTheatreAndShowTimeWithMovie = async (
    movieId: string,
    cityId: string
  ): Promise<Theatre[]> => {
    const theatresWithShowTime: Theatre[] = await this.prisma
      .$queryRawUnsafe(`select distinct th.name,sh."showStartTimeInUtc" from "Show" as sh
			inner join "Screen" as sc 
			on sh."screenId" = sc.id 
			inner join "Theatre" as th
			on sc."theatreId" = th.id
			where sh."movieId" = '${movieId}' and th."cityId" = '${cityId}'`);
    return theatresWithShowTime;
  };
}

const TheatreWithMovieRespositoryInstance = new TheatreWithMovieRespository();
export default TheatreWithMovieRespositoryInstance;
