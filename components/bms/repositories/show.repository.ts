import { Seat } from "../../../common/models/seat.model";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ShowRepository {
  async getAvailableSeatsOfShow(
    theatreIdUrl: string,
    movieIdUrl: string,
    showIdUrl: string
  ): Promise<Seat[]> {
    const screenIdJson = await prisma.show.findFirst({
      where: {
        id: showIdUrl,
      },
      select: {
        screenId: true,
      },
    });
    const screenIdUrl: string = screenIdJson?.screenId as string;
    const availableSeats: Seat[] = await prisma.$queryRawUnsafe(
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
// AND b."showId" = '${showIdUrl}' AND s."screenId"='${screenIdUrl}'
// WHERE b.id IS NULL

// `
// SELECT s.*
// FROM "Seat" s
// left join "BookedSeat" b
//   ON b."seatId" = s.id AND b."showId" = '${showIdUrl}' AND s."screenId"='${screenIdUrl}'
//  WHERE b.id IS NULL
// `

// `SELECT s.*
// FROM "Seat" s
// left join "BookedSeat" b
//   ON b."seatId" = s.id AND b."showId" = '${showIdUrl}'
//  WHERE b.id IS NULL AND s."screenId"='${screenIdUrl}'
// `
