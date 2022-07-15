import { PrismaClient } from "@prisma/client";

class TheatreWithMovieRespository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  getTheatreAndShowTimeWithMovie = async (movieId: string): Promise<string> => {
    return "";
  };
}

const TheatreWithMovieRespositoryInstance = new TheatreWithMovieRespository();
export default TheatreWithMovieRespositoryInstance;
