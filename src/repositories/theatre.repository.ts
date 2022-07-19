import { Show } from "../models/show.model";
import { DateTimeHelper } from "../common/helpers/dateTime.helper";
import { PrismaClient } from "@prisma/client";
class TheatreRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getShowsOfMovie(
    theatreIdUrl: string,
    movieIdUrl: string
  ): Promise<Show[]> {
    const DateTime = new DateTimeHelper();
    const availableShows = await this.prisma.show.findMany({
      where: {
        movieId: movieIdUrl,
        screen: {
          theatreId: theatreIdUrl,
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
    return showModels;
  }
}
export const theatreRepository = new TheatreRepository();
