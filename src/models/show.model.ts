export class Show {
  id: string;
  screenId: string;
  movieId: string;
  showStartTimeInUtc: Date;
  showEndTimeInUtc: Date;
  availableUntilUtc: Date | null;
  bookedSeatCount?: number;
  totalSeatCount?: number;
  availablityStatus?: string;
}
