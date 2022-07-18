import { Show } from "../../../common/models/show.model";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class TheatreRepository {
  async getShowsOfMovie(
    theatreIdUrl: string,
    movieIdUrl: string
  ): Promise<Show[]> {
    const availableShows = await prisma.show.findMany({
      where: {
        movieId: movieIdUrl,
        screen: {
          theatreId: theatreIdUrl,
        },
        // availableUntilUtc:{
        //   equals:undefined,
        // },
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
      ShowModel.bookedSeatsCount = availableShows[i]._count.bookedSeat;
      ShowModel.totalSeatsCount = availableShows[i].screen._count.seat;

      showModels.push(ShowModel);
    }
    return showModels;
  }
}
