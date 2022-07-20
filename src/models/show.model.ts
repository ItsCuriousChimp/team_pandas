export class Show {
  id: string;
  showStartTimeInUtc: Date;
  showEndTimeInUtc: Date;
  availableUntilUtc: Date | null;
  screenId: string;
  movieId: string;
  bookedSeatCount?: number;
  totalSeatCount?: number;
  availablityStatus?: string;
}
