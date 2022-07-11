export class Show {
  id: string;
  showstartTimeInUtc: Date;
  showEndTimeInUtc: Date;
  availableUntilInUtc: Date;
  screen: Screen;

  //get all show details

  // public getDetails(): object {
  //   return {
  //     startTime: this.showstartTimeInUtc,
  //     endTime: this.showEndTimeInUtc,
  //     availableUntil: this.availableUntilInUtc,
  //     screen: this.screen,
  //     movie: this.movie,
  //   };
  // }
}
