import { Seat } from "../models/seat.model";
import { PrismaClient } from "@prisma/client";

class ShowRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async getAvailableSeatsOfShow(
    theatreIdUrl: string,
    movieIdUrl: string,
    showIdUrl: string
  ): Promise<Seat[]> {
    const screenIdJson = await this.prisma.show.findFirst({
      where: {
        id: showIdUrl,
      },
      select: {
        screenId: true,
      },
    });
    const screenIdUrl: string = screenIdJson?.screenId as string;
    const availableSeats: Seat[] = await this.prisma.$queryRawUnsafe(
      `
        SELECT s.*
        FROM ( SELECT * FROM "Seat" where "Seat"."screenId"='${screenIdUrl}' ) as s
        left join "BookedSeat" b 
          ON b."seatId" = s.id AND b."showId" = '${showIdUrl}'
         WHERE b.id IS NULL
        `
    );
    return availableSeats;
  }
}
export const showRepository = new ShowRepository();
