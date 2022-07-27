class DataMapHelper {
  dataMap = (
    bookingId: string,
    showId: string,
    seatIds: string[],
    insertData: {
      bookingId: string;
      showId: string;
      seatId: string;
    }[]
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
