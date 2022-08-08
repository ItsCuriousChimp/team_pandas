import { dataDTO } from "../customTypes/insertData.type";

class DataMapHelper {
  dataMap = (
    bookingId: string,
    showId: string,
    seatIds: string[],
    insertData: dataDTO[]
  ) => {
    seatIds.map((seatId: string) => {
      return insertData.push({
        bookingId: bookingId,
        showId: showId,
        seatId: seatId,
      });
    });
  };
}
export const dataMapHelper = new DataMapHelper();
