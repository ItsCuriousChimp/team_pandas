/* eslint-disable @typescript-eslint/no-explicit-any */
import { Show } from "../models/show.model";
import { DateTimeHelper } from "../common/helpers/dateTime.helper";
import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";
import { dbClient } from "./dbClient";
import CustomError from "../common/utils/customErrors/customError";

class ShowRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = dbClient.prisma;
  }

  getShow = async (showId: string): Promise<Show | null> => {
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
    } catch (err: any) {
      throw new CustomError({
        ...err,
        data: showId,
        statusCode: 500,
        message: "Unable to fetch show",
      });
    }
  };

  getShowsOfTheatreAndMovie = async (
    theatreId: string,
    movieId: string
  ): Promise<Show[]> => {
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
    } catch (err: any) {
      throw new CustomError({
        ...err,
        data: theatreId,
        movieId,
        statusCode: 500,
        message: "Unable to fetch shows of a theatre playing a movie",
      });
    }
  };
}
export const showRepository = new ShowRepository();
