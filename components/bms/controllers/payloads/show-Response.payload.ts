export class ShowResponsePayload {
  id: string;
  screenId: string;
  movieId: string;
  showStartTimeInUtc: Date;
  showEndTimeInUtc: Date;
  availableUntilUtc: Date | null;
  totalSeatsCount: number;
  availableSeatsCount: number;
  availablityStatus: string;
}
