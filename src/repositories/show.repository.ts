import { Show } from "../models/show.model";
import { DateTimeHelper } from "../common/helpers/dateTime.helper";
import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";

class ShowRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getShow(showId: string): Promise<Show | null> {
    try {
      logger.info("get show", {
        showId,
        __filename,
        functionName: "getShow",
      });

      const show = await this.prisma.show.findUnique({
        where: {
          id: showId,
        },
      });

      logger.info("fetching show successful", {
        __filename,
        functionName: "getShow",
      });

      return show;
    } catch (err) {
      console.log("unable to fetch show");
      throw err;
    }
  }

  async getShowsOfTheatreAndMovie(
    theatreId: string,
    movieId: string
  ): Promise<Show[]> {
    try {
      logger.info("fetching shows with movie id and theatre id from DB", {
        theatreId,
        movieId,
        __filename,
        functionName: "getShowsOfTheatreAndMovie",
      });

      const DateTime = new DateTimeHelper();
      const availableShows = await this.prisma.show.findMany({
        where: {
          movieId: movieId,
          screen: {
            theatreId: theatreId,
          },
          showStartTimeInUtc: {
            gte: DateTime.getCurrentDate(),
            lte: DateTime.getDaysAfter(14),
          },
        },
        include: {
          _count: {
            select: {
              bookedSeat: true,
            },
          },
          screen: {
            include: {
              _count: {
                select: {
                  seat: true,
                },
              },
            },
          },
        },
      });

      const showModels: Show[] = [];

      for (let i = 0; i < availableShows.length; i += 1) {
        const {
          id,
          movieId,
          screenId,
          showStartTimeInUtc,
          showEndTimeInUtc,
          availableUntilUtc,
        } = availableShows[i];
        const ShowModel = new Show();
        ShowModel.id = id;
        ShowModel.screenId = screenId;
        ShowModel.movieId = movieId;
        ShowModel.showStartTimeInUtc = showStartTimeInUtc;
        ShowModel.showEndTimeInUtc = showEndTimeInUtc;
        ShowModel.availableUntilUtc = availableUntilUtc;
        ShowModel.bookedSeatCount = availableShows[i]._count.bookedSeat;
        ShowModel.totalSeatCount = availableShows[i].screen._count.seat;

        showModels.push(ShowModel);
      }

      logger.info("fetching shows successful", {
        __filename,
        functionName: "getShowsOfTheatreAndMovie",
      });
      return showModels;
    } catch (err) {
      console.log("unable to fetch shows from DB");
      throw err;
    }
  }
}
export const showRepository = new ShowRepository();
