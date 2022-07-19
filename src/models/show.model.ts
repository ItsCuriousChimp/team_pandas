export class Show {
  id: string;
  screenId: string;
  movieId: string;
  showStartTimeInUtc: Date;
  showEndTimeInUtc: Date;
  availableUntilUtc: Date | null;
  bookedSeatCount?: number;
  totalSeatCount?: number;
  availableSeatCount?: number;
  availablityStatus?: string;

  // adding other variables according to the ER diagram and manipulating count accordingly
  // bookedSeatsCount?: number;
  // constructor(_count:{ bookedSeat: number }) {
  //   this.bookedSeatsCount = _count.bookedSeat;
  // }

  // bookedSeatsCount?: number;
  // constructor(bookedSeatCount: number) {
  //   this.bookedSeatsCount = bookedSeatCount;
  // }
}
